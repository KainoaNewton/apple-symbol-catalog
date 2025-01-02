// This is a sample of SF Symbols - you'll want to add more
export const sfSymbols = [
  {
    id: "1",
    name: "square.and.arrow.up",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5l-8 8h5v6h6v-6h5l-8-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    tags: ["share", "export", "upload"],
  },
  {
    id: "2",
    name: "square.and.arrow.down",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 19l-8-8h5V5h6v6h5l-8 8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    tags: ["download", "save", "import"],
  },
  // Add more symbols here
];

export const findSimilarSymbols = (name: string) => {
  return sfSymbols.filter(
    (symbol) =>
      symbol.name !== name &&
      (symbol.name.includes(name.split(".")[0]) ||
        symbol.tags.some((tag) => name.includes(tag)))
  );
};