// Board Relationship Mapping - Graph Projection Logic

import type {
  BoardRow,
  Bipartite,
  Person,
  Org,
  BoardRole,
  ProjectedGraph,
  GraphNode,
  GraphLink,
} from "./boardMapTypes";

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

function idFromName(prefix: string, name: string) {
  return `${prefix}:${slugify(name)}`;
}

/**
 * Build a bipartite graph (People ↔ Organizations) from CSV rows
 */
export function buildBipartite(rows: BoardRow[]): Bipartite {
  const peopleMap = new Map<string, Person>();
  const orgMap = new Map<string, Org>();
  const roles: BoardRole[] = [];

  for (const r of rows) {
    if (!r.person_name || !r.org_name) continue;

    // Use email for de-duplication if available, otherwise use name
    const pId = r.person_email
      ? `person:${r.person_email.toLowerCase()}`
      : idFromName("person", r.person_name);

    if (!peopleMap.has(pId)) {
      peopleMap.set(pId, {
        id: pId,
        name: r.person_name,
        email: r.person_email,
      });
    } else {
      const p = peopleMap.get(pId)!;
      // Keep the most complete name/email
      if (!p.email && r.person_email) p.email = r.person_email;
      if (p.name.length < r.person_name.length) p.name = r.person_name;
    }

    const oId = idFromName("org", r.org_name);
    if (!orgMap.has(oId)) orgMap.set(oId, { id: oId, name: r.org_name });

    roles.push({
      personId: pId,
      orgId: oId,
      role: r.role,
      start_year: r.start_year ?? null,
      end_year: r.end_year ?? null,
    });
  }

  return {
    people: Array.from(peopleMap.values()),
    orgs: Array.from(orgMap.values()),
    roles,
  };
}

/**
 * Project a bipartite graph onto people (people connected by shared organizations)
 * Note: Filtering should be done before building the bipartite graph
 */
export function projectPeopleGraph(bi: Bipartite): ProjectedGraph {
  // Group people by organization
  const byOrg = new Map<string, string[]>();
  for (const r of bi.roles) {
    if (!byOrg.has(r.orgId)) byOrg.set(r.orgId, []);
    byOrg.get(r.orgId)!.push(r.personId);
  }

  // Create edges between people who share organizations
  const weightMap = new Map<string, number>();
  for (const [, personIds] of Array.from(byOrg.entries())) {
    for (let i = 0; i < personIds.length; i++) {
      for (let j = i + 1; j < personIds.length; j++) {
        const a = personIds[i],
          b = personIds[j];
        const key = a < b ? `${a}||${b}` : `${b}||${a}`;
        weightMap.set(key, (weightMap.get(key) ?? 0) + 1);
      }
    }
  }

  const nodes: GraphNode[] = bi.people.map((p) => ({
    id: p.id,
    label: p.name,
    type: "person",
  }));
  const links: GraphLink[] = Array.from(weightMap.entries()).map(([k, w]) => {
    const [a, b] = k.split("||");
    return { source: a, target: b, weight: w };
  });

  // Compute degree (number of connections)
  const deg = new Map(nodes.map((n) => [n.id, 0]));
  links.forEach((l) => {
    deg.set(String(l.source), (deg.get(String(l.source)) ?? 0) + 1);
    deg.set(String(l.target), (deg.get(String(l.target)) ?? 0) + 1);
  });
  nodes.forEach((n) => (n.degree = deg.get(n.id) ?? 0));

  return { nodes, links };
}

/**
 * Project onto organizations (orgs connected by shared board members)
 * Note: Filtering should be done before building the bipartite graph
 */
export function projectOrgGraph(bi: Bipartite): ProjectedGraph {
  // Group organizations by person
  const byPerson = new Map<string, string[]>();
  for (const r of bi.roles) {
    if (!byPerson.has(r.personId)) byPerson.set(r.personId, []);
    byPerson.get(r.personId)!.push(r.orgId);
  }

  // Create edges between orgs that share board members
  const weightMap = new Map<string, number>();
  for (const [, orgIds] of Array.from(byPerson.entries())) {
    for (let i = 0; i < orgIds.length; i++) {
      for (let j = i + 1; j < orgIds.length; j++) {
        const a = orgIds[i],
          b = orgIds[j];
        const key = a < b ? `${a}||${b}` : `${b}||${a}`;
        weightMap.set(key, (weightMap.get(key) ?? 0) + 1);
      }
    }
  }

  const nodes: GraphNode[] = bi.orgs.map((o) => ({
    id: o.id,
    label: o.name,
    type: "org",
  }));
  const links: GraphLink[] = Array.from(weightMap.entries()).map(([k, w]) => {
    const [a, b] = k.split("||");
    return { source: a, target: b, weight: w };
  });

  const deg = new Map(nodes.map((n) => [n.id, 0]));
  links.forEach((l) => {
    deg.set(String(l.source), (deg.get(String(l.source)) ?? 0) + 1);
    deg.set(String(l.target), (deg.get(String(l.target)) ?? 0) + 1);
  });
  nodes.forEach((n) => (n.degree = deg.get(n.id) ?? 0));

  return { nodes, links };
}

/**
 * Build a simple overlap matrix for orgs: cell = shared directors count
 */
export function buildOrgOverlapMatrix(bi: Bipartite) {
  const idx = new Map(bi.orgs.map((o, i) => [o.id, i]));
  const size = bi.orgs.length;
  const mat = Array.from({ length: size }, () =>
    new Array<number>(size).fill(0)
  );

  // Map person -> their org set
  const byPerson = new Map<string, Set<string>>();
  for (const r of bi.roles) {
    if (!byPerson.has(r.personId)) byPerson.set(r.personId, new Set());
    byPerson.get(r.personId)!.add(r.orgId);
  }

  // Fill matrix with overlap counts
  for (const [, orgs] of Array.from(byPerson.entries())) {
    const list = Array.from(orgs);
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const aIdx = idx.get(list[i]);
        const bIdx = idx.get(list[j]);
        if (aIdx !== undefined && bIdx !== undefined) {
          mat[aIdx][bIdx] += 1;
          mat[bIdx][aIdx] += 1;
        }
      }
    }
  }

  return { matrix: mat, orgs: bi.orgs };
}
