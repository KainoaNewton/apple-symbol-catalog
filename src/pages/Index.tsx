import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SymbolGrid } from "@/components/SymbolGrid";
import { searchSymbols } from "@/utils/search";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { setTheme, theme } = useTheme();
  const symbols = searchSymbols(searchQuery);

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
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <SymbolGrid symbols={symbols} />
      </main>
    </div>
  );
};

export default Index;