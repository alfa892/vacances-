import type { SearchResult } from "./types";

export type SearchResponse = {
  query: string;
  results: SearchResult[];
};
