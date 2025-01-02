import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { findSimilarSymbols } from "@/data/sf-symbols";
import { Download, Copy, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SymbolDrawerProps {
  symbol: any;
  onClose: () => void;
}

export const SymbolDrawer = ({ symbol, onClose }: SymbolDrawerProps) => {
  const [color, setColor] = useState("#000000");
  
  if (!symbol) return null;

  const similarSymbols = findSimilarSymbols(symbol.name);

  const handleDownload = (format = 'svg') => {
    console.log(`Downloading ${symbol.name} in ${format} format`);
  };

  const handleCopy = (format = 'svg') => {
    console.log(`Copying ${symbol.name} in ${format} format`);
  };

  return (
    <Sheet open={!!symbol} onOpenChange={() => onClose()}>
      <SheetContent side="bottom" className="h-[80vh]">
        <div className="h-full overflow-y-auto px-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">{symbol.name}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="aspect-square w-32 h-32 mx-auto mb-6 bg-accent/50 rounded-xl p-6 flex items-center justify-center">
                <img 
                  src={symbol.svg} 
                  alt={symbol.name}
                  className="w-full h-full dark:invert"
                  style={{ filter: `opacity(1) drop-shadow(0 0 0 ${color})` }}
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Color</label>
                  <Input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleDownload('svg')}>
                        SVG
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDownload('png')}>
                        PNG
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDownload('jpg')}>
                        JPG
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleCopy('svg')}>
                        SVG
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCopy('png')}>
                        PNG
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCopy('jpg')}>
                        JPG
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Similar Symbols</h3>
              <div className="grid grid-cols-4 gap-4">
                {similarSymbols.map((similar) => (
                  <div
                    key={similar.id}
                    className="p-4 rounded-xl bg-accent/50 hover:bg-accent transition-colors duration-200 aspect-square flex items-center justify-center"
                  >
                    <img src={similar.svg} alt={similar.name} className="w-8 h-8 dark:invert" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};