// Board Relationship Mapping Types

export type BoardRow = {
  person_name: string;
  person_email?: string;
  org_name: string;
  role?: string;
  start_year?: number | null;
  end_year?: number | null;
};

export type Person = {
  id: string;
  name: string;
  email?: string;
  aliases?: string[];
};

export type Org = {
  id: string;
  name: string;
  sector?: string;
  city?: string;
  state?: string;
};

export type BoardRole = {
  personId: string;
  orgId: string;
  role?: string;
  start_year?: number | null;
  end_year?: number | null;
};

export type Bipartite = {
  people: Person[];
  orgs: Org[];
  roles: BoardRole[];
};

export type GraphNode = {
  id: string;
  label: string;
  type: "person" | "org";
  degree?: number;
};

export type GraphLink = {
  source: string;
  target: string;
  weight: number;
};

export type ProjectedGraph = {
  nodes: GraphNode[];
  links: GraphLink[];
};
