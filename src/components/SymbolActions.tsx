import { Button } from "@/components/ui/button";
import { Download, FileCode } from "lucide-react";

interface SymbolActionsProps {
  onDownload: () => Promise<void>;
  onCopyHtml: () => Promise<void>;
}

export const SymbolActions = ({ onDownload, onCopyHtml }: SymbolActionsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
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
        Copy SVG HTML
      </Button>
    </div>
  );
};