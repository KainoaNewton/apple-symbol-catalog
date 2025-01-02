import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SymbolGrid } from "@/components/SymbolGrid";
import { searchSymbols } from "@/utils/search";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { setTheme, theme } = useTheme();
  const { symbols, totalPages } = searchSymbols(searchQuery, currentPage);

  const handleLoadMore = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <h1 className="text-xl font-bold">SF Symbols Catalog</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <main className="container py-6">
        <SearchBar value={searchQuery} onChange={(value) => {
          setSearchQuery(value);
          setCurrentPage(1); // Reset to first page on new search
        }} />
        <SymbolGrid symbols={symbols} />
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