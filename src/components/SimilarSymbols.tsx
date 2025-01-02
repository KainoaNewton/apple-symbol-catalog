import { useTheme } from "@/components/ThemeProvider";

interface SimilarSymbolsProps {
  symbols: any[];
  onSymbolClick: (symbol: any) => void;
}

export const SimilarSymbols = ({ symbols, onSymbolClick }: SimilarSymbolsProps) => {
  const { theme } = useTheme();

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Similar Symbols</h3>
      <div className="grid grid-cols-4 gap-4">
        {symbols.map((similar) => (
          <button
            key={similar.id}
            onClick={() => onSymbolClick(similar)}
            className="p-4 rounded-xl bg-accent/50 hover:bg-accent transition-colors duration-200 aspect-square flex items-center justify-center"
          >
            <img 
              src={similar.svg} 
              alt={similar.name}
              className="brightness-0 invert" 
            />
          </button>
        ))}
      </div>
    </div>
  );
};