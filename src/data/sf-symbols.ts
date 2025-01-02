import symbolsData from './sf-symbols.json';

export const sfSymbols = symbolsData;

export const findSimilarSymbols = (name: string) => {
  return sfSymbols.filter(
    (symbol) =>
      symbol.name !== name &&
      symbol.name.includes(name.split(".")[0])
  );
};