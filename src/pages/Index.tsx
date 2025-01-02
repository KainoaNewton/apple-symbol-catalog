import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SymbolGrid } from "@/components/SymbolGrid";
import { searchSymbols } from "@/utils/search";
import { Button } from "@/components/ui/button";
import { sfSymbols } from "@/data/sf-symbols";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedSymbols, setLoadedSymbols] = useState<typeof sfSymbols>([]);
  const { symbols, totalPages } = searchSymbols(searchQuery, currentPage);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      const { symbols: newSymbols } = searchSymbols(searchQuery, nextPage);
      setLoadedSymbols(prev => [...prev, ...newSymbols]);
      setCurrentPage(nextPage);
    }
  };

  // Update loadedSymbols when search query changes
  useEffect(() => {
    const { symbols: initialSymbols } = searchSymbols(searchQuery, 1);
    setLoadedSymbols(initialSymbols);
    setCurrentPage(1);
  }, [searchQuery]);

  const displayedSymbols = currentPage === 1 ? symbols : loadedSymbols;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center gap-4">
          <h1 className="text-xl font-bold whitespace-nowrap">SF Symbols Catalog</h1>
          <SearchBar 
            value={searchQuery} 
            onChange={(value) => {
              setSearchQuery(value);
              setCurrentPage(1);
            }} 
          />
        </div>
      </header>

      <main className="container py-6">
        <SymbolGrid symbols={displayedSymbols} />
        {currentPage < totalPages && (
          <div className="mt-8 flex justify-center">
            <Button 
              variant="outline"
              onClick={handleLoadMore}
              className="w-full max-w-xs"
            >
              Load More Symbols
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;