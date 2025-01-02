import { useState } from "react";
import { sfSymbols } from "@/data/sf-symbols";
import { SymbolDrawer } from "./SymbolDrawer";
import { useTheme } from "@/components/ThemeProvider";

interface SymbolGridProps {
  symbols: typeof sfSymbols;
}

export const SymbolGrid = ({ symbols }: SymbolGridProps) => {
  const [selectedSymbol, setSelectedSymbol] = useState<(typeof sfSymbols)[0] | null>(null);
  const { theme } = useTheme();

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {symbols.map((symbol) => (
          <button
            key={symbol.id}
            onClick={() => setSelectedSymbol(symbol)}
            className="p-4 rounded-xl hover:bg-accent/50 transition-colors duration-200 aspect-square flex items-center justify-center group relative"
          >
            <img 
              src={symbol.svg} 
              alt={symbol.name} 
              className="w-8 h-8 group-hover:scale-110 transition-transform duration-200"
              style={{ 
                filter: theme === 'dark' ? 'invert(1)' : 'brightness(0)',
              }}
            />
            <div className="absolute bottom-1 left-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p className="text-xs truncate text-muted-foreground">{symbol.name}</p>
            </div>
          </button>
        ))}
      </div>
      <SymbolDrawer
        symbol={selectedSymbol}
        onClose={() => setSelectedSymbol(null)}
        onSymbolClick={setSelectedSymbol}
      />
    </>
  );
};