interface SymbolPreviewProps {
  symbol: any;
}

export const SymbolPreview = ({ symbol }: SymbolPreviewProps) => {
  return (
    <div>
      <div className="aspect-square w-32 h-32 mx-auto mb-6 bg-accent/50 rounded-xl p-6 flex items-center justify-center">
        <img 
          src={symbol.svg} 
          alt={symbol.name}
          className="w-full h-full brightness-0 invert"
        />
      </div>
    </div>
  );
};