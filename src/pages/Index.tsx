import QRCodeGenerator from "@/components/QRCodeGenerator";
import { QrCode } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
            <QrCode className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">QR ACELERA</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-20">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Gerador de{" "}
            <span className="text-primary">QR Code</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Cole uma URL e gere seu QR Code instantaneamente. Sem cadastro, sem expiração.
          </p>
        </div>
        <QRCodeGenerator />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 text-center text-sm text-muted-foreground">
        QR Codes estáticos — funcionam para sempre.
      </footer>
    </div>
  );
};

export default Index;
