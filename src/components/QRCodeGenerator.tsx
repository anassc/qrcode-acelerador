import { useState, useCallback } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, QrCode, AlertCircle } from "lucide-react";

const STYLES = [
  { label: "Moderno", value: "modern" },
  { label: "Clássico P&B", value: "classic" },
];

const COLORS = [
  { label: "Laranja", value: "#FF8A00" },
  { label: "Branco", value: "#FFFFFF" },
  { label: "Azul", value: "#3B82F6" },
  { label: "Verde", value: "#22C55E" },
  { label: "Roxo", value: "#A855F7" },
];

const SIZES = [
  { label: "Pequeno", value: 200 },
  { label: "Médio", value: 300 },
  { label: "Grande", value: 400 },
];

const isValidUrl = (str: string) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

const QRCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);
  const [selectedSize, setSelectedSize] = useState(SIZES[1].value);

  const generateQR = useCallback(async () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Por favor, insira uma URL.");
      setQrDataUrl(null);
      return;
    }
    if (!isValidUrl(trimmed)) {
      setError("URL inválida. Insira uma URL completa (ex: https://exemplo.com).");
      setQrDataUrl(null);
      return;
    }
    setError("");
    try {
      const dataUrl = await QRCode.toDataURL(trimmed, {
        width: selectedSize,
        margin: 2,
        color: {
          dark: selectedColor,
          light: selectedColor === "#FFFFFF" ? "#000000" : "#00000000",
        },
        errorCorrectionLevel: "H",
      });
      setQrDataUrl(dataUrl);
    } catch {
      setError("Erro ao gerar o QR Code.");
    }
  }, [url, selectedColor, selectedSize]);

  const downloadQR = useCallback(() => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrDataUrl;
    link.click();
  }, [qrDataUrl]);

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      <div className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-6">
        {/* URL Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Cole sua URL
          </label>
          <Input
            type="url"
            placeholder="https://exemplo.com"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && generateQR()}
            className="h-12 bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
          />
          {error && (
            <p className="text-sm text-destructive flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>
          )}
        </div>

        {/* Color Picker */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Cor do QR Code
          </label>
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c.value}
                onClick={() => setSelectedColor(c.value)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColor === c.value
                    ? "border-primary scale-110"
                    : "border-border hover:border-muted-foreground"
                }`}
                style={{ backgroundColor: c.value }}
                title={c.label}
              />
            ))}
          </div>
        </div>

        {/* Size Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Tamanho
          </label>
          <div className="flex gap-2">
            {SIZES.map((s) => (
              <button
                key={s.value}
                onClick={() => setSelectedSize(s.value)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  selectedSize === s.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-border"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={generateQR}
          className="w-full h-12 text-base font-semibold bg-primary hover:brightness-110 text-primary-foreground"
          style={{ background: "var(--gradient-primary)" }}
        >
          <QrCode className="w-5 h-5 mr-2" />
          Gerar QR Code
        </Button>

        {/* QR Code Display */}
        {qrDataUrl && (
          <div className="flex flex-col items-center gap-4 pt-2 animate-fade-in">
            <div className="p-4 rounded-lg bg-background border border-border">
              <img
                src={qrDataUrl}
                alt="QR Code gerado"
                width={selectedSize}
                height={selectedSize}
                className="max-w-full h-auto"
              />
            </div>
            <Button
              onClick={downloadQR}
              variant="outline"
              className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Download className="w-4 h-4" />
              Baixar PNG
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
