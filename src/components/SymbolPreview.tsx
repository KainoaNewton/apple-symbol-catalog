import { Input } from "@/components/ui/input";

interface SymbolPreviewProps {
  symbol: any;
  color: string;
  onColorChange: (color: string) => void;
}

export const SymbolPreview = ({ symbol, color, onColorChange }: SymbolPreviewProps) => {
  return (
    <div>
      <div className="aspect-square w-32 h-32 mx-auto mb-6 bg-accent/50 rounded-xl p-6 flex items-center justify-center">
        <img 
          src={symbol.svg} 
          alt={symbol.name}
          className="w-full h-full"
          style={{ 
            filter: color === "#ffffff" ? 'brightness(0) invert(1)' : 'none',
            fill: color !== "#ffffff" ? color : undefined
          }}
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">Color</label>
        <Input
          type="color"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-full h-10"
        />
      </div>
    </div>
  );
};