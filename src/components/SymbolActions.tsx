import { Button } from "@/components/ui/button";
import { Download, Copy, FileCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SymbolActionsProps {
  onDownload: () => Promise<void>;
  onCopyHtml: () => Promise<void>;
  onCopySvg: () => Promise<void>;
}

export const SymbolActions = ({ onDownload, onCopyHtml, onCopySvg }: SymbolActionsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Button 
        variant="outline" 
        onClick={onDownload}
        className="w-full"
      >
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>

      <Button 
        variant="outline" 
        onClick={onCopyHtml}
        className="w-full"
      >
        <FileCode className="mr-2 h-4 w-4" />
        Copy HTML
      </Button>

      <Button 
        variant="outline" 
        onClick={onCopySvg}
        className="w-full"
      >
        <Copy className="mr-2 h-4 w-4" />
        Copy SVG
      </Button>
    </div>
  );
};