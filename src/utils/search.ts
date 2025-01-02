import Fuse from "fuse.js";
import { sfSymbols } from "@/data/sf-symbols";

const fuse = new Fuse(sfSymbols, {
  keys: ["name"],
  threshold: 0.3,
});

export const searchSymbols = (query: string, page: number = 1, itemsPerPage: number = 50) => {
  let results = query ? fuse.search(query).map((result) => result.item) : sfSymbols;
  
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  return {
    symbols: results.slice(startIndex, endIndex),
    totalPages: Math.ceil(results.length / itemsPerPage),
    totalSymbols: results.length
  };
};