import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { findSimilarSymbols } from "@/data/sf-symbols";
import { SymbolPreview } from "./SymbolPreview";
import { SymbolActions } from "./SymbolActions";
import { SimilarSymbols } from "./SimilarSymbols";

interface SymbolDrawerProps {
  symbol: any;
  onClose: () => void;
  onSymbolClick: (symbol: any) => void;
}

export const SymbolDrawer = ({ symbol, onClose, onSymbolClick }: SymbolDrawerProps) => {
  const { toast } = useToast();
  
  if (!symbol) return null;

  const similarSymbols = findSimilarSymbols(symbol.name);

  const handleDownload = async () => {
    try {
      const response = await fetch(symbol.svg);
      const svgText = await response.text();
      const blob = new Blob([svgText], { type: 'image/svg+xml' });
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

  const handleCopyHtml = async () => {
    try {
      const response = await fetch(symbol.svg);
      const svgText = await response.text();
      await navigator.clipboard.writeText(svgText);
      
      toast({
        title: "Success",
        description: "SVG HTML copied to clipboard",
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
            <div className="space-y-4">
              <SymbolPreview symbol={symbol} />
              <SymbolActions 
                onDownload={handleDownload}
                onCopyHtml={handleCopyHtml}
              />
            </div>

            <SimilarSymbols 
              symbols={similarSymbols} 
              onSymbolClick={onSymbolClick} 
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};