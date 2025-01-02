import Fuse from "fuse.js";
import { sfSymbols } from "@/data/sf-symbols";

const fuse = new Fuse(sfSymbols, {
  keys: ["name"],
  threshold: 0.3,
});

export const searchSymbols = (query: string) => {
  if (!query) return sfSymbols;
  return fuse.search(query).map((result) => result.item);
};