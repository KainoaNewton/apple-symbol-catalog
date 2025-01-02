import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { findSimilarSymbols } from "@/data/sf-symbols";
import { Download, Copy, X } from "lucide-react";

interface SymbolDrawerProps {
  symbol: any;
  onClose: () => void;
}

export const SymbolDrawer = ({ symbol, onClose }: SymbolDrawerProps) => {
  const [color, setColor] = useState("#000000");
  
  if (!symbol) return null;

  const similarSymbols = findSimilarSymbols(symbol.name);

  const downloadSymbol = (format: string) => {
    // Implementation for downloading in different formats
    console.log(`Downloading ${symbol.name} in ${format} format`);
  };

  const copySymbol = (format: string) => {
    // Implementation for copying in different formats
    console.log(`Copying ${symbol.name} in ${format} format`);
  };

  return (
    <Sheet open={!!symbol} onOpenChange={() => onClose()}>
      <SheetContent side="bottom" className="h-[80vh]">
        <div className="h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">{symbol.name}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="w-32 h-32 mx-auto mb-6">
                <img 
                  src={symbol.svg} 
                  alt={symbol.name}
                  style={{ filter: `opacity(1) drop-shadow(0 0 0 ${color})` }}
                  className="w-full h-full"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Color</label>
                  <Input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Download</h3>
                    <div className="space-y-2">
                      {["SVG", "PNG", "JPG"].map((format) => (
                        <Button
                          key={format}
                          variant="outline"
                          className="w-full"
                          onClick={() => downloadSymbol(format)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          {format}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Copy</h3>
                    <div className="space-y-2">
                      {["SVG", "PNG", "JPG"].map((format) => (
                        <Button
                          key={format}
                          variant="outline"
                          className="w-full"
                          onClick={() => copySymbol(format)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          {format}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Similar Symbols</h3>
              <div className="grid grid-cols-4 gap-4">
                {similarSymbols.map((similar) => (
                  <div
                    key={similar.id}
                    className="p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 aspect-square flex items-center justify-center"
                  >
                    <img src={similar.svg} alt={similar.name} className="w-8 h-8" />
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