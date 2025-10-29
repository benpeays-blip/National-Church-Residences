import { create } from "zustand";
import type {
  Bipartite,
  BoardRow,
  ProjectedGraph,
} from "./boardMapTypes";
import {
  buildBipartite,
  projectOrgGraph,
  projectPeopleGraph,
  buildOrgOverlapMatrix,
} from "./boardMapBuild";

type ViewMode = "people" | "orgs";

type State = {
  rows: BoardRow[];
  bi?: Bipartite;
  graph?: ProjectedGraph;
  view: ViewMode;
  query: string;
  roleFilter?: string;
  yearMin?: number;
  yearMax?: number;
  setView: (v: ViewMode) => void;
  setFilters: (
    p: Partial<Pick<State, "query" | "roleFilter" | "yearMin" | "yearMax">>
  ) => void;
  importRows: (rows: BoardRow[]) => void;
  compute: () => void;
};

export const useBoardMap = create<State>((set, get) => ({
  rows: [],
  view: "people",
  query: "",
  setView: (v) => {
    set({ view: v });
    get().compute();
  },
  setFilters: (p) => set(p),
  importRows: (rows) => {
    set({ rows });
  },
  compute: () => {
    const { rows, view, roleFilter, yearMin, yearMax } = get();
    
    // Apply filters to rows first
    const filteredRows = rows.filter((r) => {
      if (roleFilter && r.role !== roleFilter) return false;
      if (yearMin && r.start_year && r.start_year < yearMin) return false;
      if (yearMax && r.end_year && r.end_year > yearMax) return false;
      return true;
    });
    
    // Build bipartite graph from filtered rows
    const bi = buildBipartite(filteredRows);
    
    // Project graph (no additional filtering needed since bi is already filtered)
    let graph: ProjectedGraph | undefined;
    graph = view === "people" ? projectPeopleGraph(bi) : projectOrgGraph(bi);
    
    set({ bi, graph });
  },
}));

export { buildOrgOverlapMatrix };
