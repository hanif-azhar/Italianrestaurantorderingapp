import { useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { QrCode, X, Camera, Hash, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/app/components/ui/alert';

interface QRScannerProps {
  onScanSuccess: (tableNumber: string) => void;
  onClose: () => void;
}

export function QRScanner({ onScanSuccess, onClose }: QRScannerProps) {
  const [mode, setMode] = useState<'manual' | 'camera'>('manual');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tableNumber, setTableNumber] = useState('');
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const mountedRef = useRef(true);

  const startCamera = async () => {
    try {
      setError(null);
      setIsScanning(true);
      
      const readerElement = document.getElementById("qr-reader");
      if (!readerElement) {
        throw new Error("Scanner element not found");
      }

      const html5QrCode = new Html5Qrcode("qr-reader");
      html5QrCodeRef.current = html5QrCode;
      
      const config = { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      };
      
      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          // Success - close scanner and pass table number
          onScanSuccess(decodedText);
          stopCamera();
        },
        () => {
          // Scanning error - ignore
        }
      );
    } catch (err: any) {
      console.error('Camera start failed:', err);
      setIsScanning(false);
      
      if (err.name === 'NotAllowedError' || err.message?.includes('NotAllowedError')) {
        setError("Camera permission denied. Please enter your table number manually below.");
      } else if (err.name === 'NotFoundError') {
        setError("No camera found. Please enter your table number manually below.");
      } else if (err.name === 'NotReadableError') {
        setError("Camera is already in use. Please enter your table number manually below.");
      } else {
        setError("Unable to access camera. Please enter your table number manually below.");
      }
      
      // Switch back to manual mode
      setMode('manual');
    }
  };

  const stopCamera = () => {
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current.stop().catch(() => {});
      html5QrCodeRef.current = null;
    }
    setIsScanning(false);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tableNumber.trim()) {
      onScanSuccess(`Table ${tableNumber.trim()}`);
    }
  };

  const handleModeSwitch = (newMode: 'manual' | 'camera') => {
    if (newMode === 'camera') {
      setMode('camera');
      // Small delay to ensure DOM is ready
      setTimeout(() => startCamera(), 100);
    } else {
      stopCamera();
      setMode('manual');
      setError(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <Card className="w-full max-w-md relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-10"
          onClick={() => {
            stopCamera();
            onClose();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-6 w-6 text-[#8B4513]" />
            Table Number
          </CardTitle>
          <CardDescription>
            Enter your table number or scan the QR code
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Mode Toggle */}
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            <Button
              type="button"
              variant={mode === 'manual' ? 'default' : 'ghost'}
              className={`flex-1 ${mode === 'manual' ? 'bg-[#8B4513] hover:bg-[#6B3410] text-white' : ''}`}
              onClick={() => handleModeSwitch('manual')}
            >
              <Hash className="h-4 w-4 mr-2" />
              Enter Number
            </Button>
            <Button
              type="button"
              variant={mode === 'camera' ? 'default' : 'ghost'}
              className={`flex-1 ${mode === 'camera' ? 'bg-[#8B4513] hover:bg-[#6B3410] text-white' : ''}`}
              onClick={() => handleModeSwitch('camera')}
            >
              <Camera className="h-4 w-4 mr-2" />
              Scan QR
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Camera Mode */}
          {mode === 'camera' && (
            <div className="space-y-3">
              {!isScanning && !error && (
                <div className="text-center py-8">
                  <Camera className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click button above to start camera
                  </p>
                </div>
              )}
              <div id="qr-reader" className={`w-full ${isScanning ? 'min-h-[250px]' : 'h-0'} rounded-lg overflow-hidden`}></div>
            </div>
          )}

          {/* Manual Entry Mode */}
          {mode === 'manual' && (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="table-number" className="text-base">Table Number</Label>
                <Input
                  id="table-number"
                  type="text"
                  placeholder="e.g., 5, 12, A3"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="text-center text-lg h-12"
                  autoFocus
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[#8B4513] hover:bg-[#6B3410] text-white h-12"
                disabled={!tableNumber.trim()}
              >
                Continue to Menu
              </Button>
            </form>
          )}

          {/* Quick Number Buttons */}
          {mode === 'manual' && (
            <div className="space-y-2">
              <p className="text-xs text-center text-muted-foreground">Quick select:</p>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <Button
                    key={num}
                    type="button"
                    variant="outline"
                    className="h-10 text-sm hover:bg-[#8B4513] hover:text-white hover:border-[#8B4513]"
                    onClick={() => {
                      setTableNumber(num.toString());
                      onScanSuccess(`Table ${num}`);
                    }}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
