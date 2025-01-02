import { useState } from "react";
import { sfSymbols } from "@/data/sf-symbols";
import { SymbolDrawer } from "./SymbolDrawer";

interface SymbolGridProps {
  symbols: typeof sfSymbols;
}

export const SymbolGrid = ({ symbols }: SymbolGridProps) => {
  const [selectedSymbol, setSelectedSymbol] = useState<(typeof sfSymbols)[0] | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-4">
        {symbols.map((symbol) => (
          <button
            key={symbol.id}
            onClick={() => setSelectedSymbol(symbol)}
            className="p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 aspect-square flex items-center justify-center"
          >
            <img src={symbol.svg} alt={symbol.name} className="w-8 h-8" />
          </button>
        ))}
      </div>
      <SymbolDrawer
        symbol={selectedSymbol}
        onClose={() => setSelectedSymbol(null)}
      />
    </>
  );
};