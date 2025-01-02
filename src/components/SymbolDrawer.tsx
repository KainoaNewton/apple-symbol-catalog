import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { findSimilarSymbols } from "@/data/sf-symbols";
import { Download, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SymbolDrawerProps {
  symbol: any;
  onClose: () => void;
}

export const SymbolDrawer = ({ symbol, onClose }: SymbolDrawerProps) => {
  const [color, setColor] = useState("#000000");
  const { toast } = useToast();
  
  if (!symbol) return null;

  const similarSymbols = findSimilarSymbols(symbol.name);

  const handleDownload = async () => {
    try {
      const response = await fetch(symbol.svg);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${symbol.name}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Success",
        description: "SVG downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download SVG",
        variant: "destructive",
      });
    }
  };

  const handleCopy = async () => {
    try {
      const response = await fetch(symbol.svg);
      const text = await response.text();
      await navigator.clipboard.writeText(text);
      
      toast({
        title: "Success",
        description: "SVG code copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy SVG",
        variant: "destructive",
      });
    }
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
                  <Button 
                    variant="outline" 
                    onClick={handleDownload}
                    className="w-full"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download SVG
                  </Button>

                  <Button 
                    variant="outline" 
                    onClick={handleCopy}
                    className="w-full"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy SVG
                  </Button>
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