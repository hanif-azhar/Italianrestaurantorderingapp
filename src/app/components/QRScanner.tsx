import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { QrCode, X } from 'lucide-react';

interface QRScannerProps {
  onScanSuccess: (tableNumber: string) => void;
  onClose: () => void;
}

export function QRScanner({ onScanSuccess, onClose }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualTable, setManualTable] = useState('');

  useEffect(() => {
    let html5QrCode: Html5Qrcode | null = null;

    const startScanner = async () => {
      try {
        html5QrCode = new Html5Qrcode("qr-reader");
        
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };
        
        await html5QrCode.start(
          { facingMode: "environment" },
          config,
          (decodedText) => {
            // Extract table number from QR code
            onScanSuccess(decodedText);
            if (html5QrCode) {
              html5QrCode.stop().then(() => {
                setIsScanning(false);
              });
            }
          },
          () => {
            // Error scanning, ignore
          }
        );
        setIsScanning(true);
      } catch (err) {
        setError("Camera access denied or not available");
        console.error(err);
      }
    };

    startScanner();

    return () => {
      if (html5QrCode && isScanning) {
        html5QrCode.stop().catch(() => {});
      }
    };
  }, []);

  const handleManualEntry = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const tableNum = manualTable.trim();
    if (tableNum) {
      onScanSuccess(`Table ${tableNum}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <Card className="w-full max-w-md relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-6 w-6" />
            Scan QR Code
          </CardTitle>
          <CardDescription>
            Scan the QR code on your table to begin ordering
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div id="qr-reader" className="w-full"></div>
          
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Or</p>
            <form className="space-y-3" onSubmit={handleManualEntry}>
              <Input
                value={manualTable}
                onChange={(event) => setManualTable(event.target.value)}
                placeholder="Enter table number"
                inputMode="numeric"
                autoComplete="off"
              />
              <Button type="submit" variant="outline" className="w-full">
                Confirm Table Number
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
