import { Input } from "@/components/ui/input";
import { useTheme } from "@/components/ThemeProvider";

interface SymbolPreviewProps {
  symbol: any;
  color: string;
  onColorChange: (color: string) => void;
}

export const SymbolPreview = ({ symbol, color, onColorChange }: SymbolPreviewProps) => {
  const { theme } = useTheme();

  return (
    <div>
      <div className="aspect-square w-32 h-32 mx-auto mb-6 bg-accent/50 rounded-xl p-6 flex items-center justify-center">
        <img 
          src={symbol.svg} 
          alt={symbol.name}
          style={{ 
            filter: color === "#000000" ? (theme === 'dark' ? 'invert(1)' : 'brightness(0)') : 'none',
            fill: color !== "#000000" ? color : undefined
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