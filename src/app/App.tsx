import { useEffect, useState } from 'react';
import { QRScanner } from '@/app/components/QRScanner';
import { MenuItem } from '@/app/components/MenuItem';
import { Cart } from '@/app/components/Cart';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/ui/tabs';
import { ShoppingCart, QrCode, CheckCircle2 } from 'lucide-react';
import { menuData, categories } from '@/app/data/menu';
import type { MenuItemType } from '@/app/components/MenuItem';

interface CartItem extends MenuItemType {
  quantity: number;
}

export default function App() {
  const [showScanner, setShowScanner] = useState(false);
  const [tableNumber, setTableNumber] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Antipasti');

  const handleScanSuccess = (decodedText: string) => {
    setTableNumber(decodedText);
    setShowScanner(false);
  };

  useEffect(() => {
    const storedTable = localStorage.getItem('tableNumber');
    if (storedTable) {
      setTableNumber(storedTable);
    }

    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart) as CartItem[];
        setCart(parsed);
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    if (tableNumber) {
      localStorage.setItem('tableNumber', tableNumber);
    } else {
      localStorage.removeItem('tableNumber');
    }
  }, [tableNumber]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: MenuItemType) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter((i) => i.id !== itemId);
    });
  };

  const deleteFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCart((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.id !== itemId);
      }

      return prev.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
    });
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
    setShowCart(false);
    setTimeout(() => {
      setOrderPlaced(false);
      setCart([]);
    }, 5000);
  };

  const getItemQuantity = (itemId: string) => {
    return cart.find((i) => i.id === itemId)?.quantity || 0;
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#009246]/5 via-white to-[#DA291C]/5">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#009246] via-white to-[#DA291C] bg-clip-text text-transparent" style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundImage: 'linear-gradient(to right, #009246 0%, #009246 33%, #FFFFFF 33%, #FFFFFF 66%, #DA291C 66%, #DA291C 100%)'
              }}>
                Ristorante Italiano
              </h1>
              {tableNumber && (
                <p className="text-sm text-muted-foreground">{tableNumber}</p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {!tableNumber && (
                <Button
                  onClick={() => setShowScanner(true)}
                  variant="outline"
                  size="sm"
                  className="border-[#009246] text-[#009246] hover:bg-[#009246]/10"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Scan Table
                </Button>
              )}
              
              <Button
                onClick={() => setShowCart(true)}
                variant="outline"
                size="sm"
                className="relative border-[#DA291C] text-[#DA291C] hover:bg-[#DA291C]/10"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-[#DA291C]">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Order Success Message */}
      {orderPlaced && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top">
          <div className="bg-[#009246] text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6" />
            <div>
              <p className="font-semibold">Order Placed Successfully!</p>
              <p className="text-sm opacity-90">Your food will be prepared shortly</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!tableNumber ? (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#009246] to-[#DA291C] flex items-center justify-center">
                <QrCode className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Welcome!</h2>
              <p className="text-muted-foreground mb-6">
                Please scan the QR code on your table to start ordering
              </p>
            </div>
            <Button
              onClick={() => setShowScanner(true)}
              size="lg"
              className="bg-[#009246] hover:bg-[#007A3A] text-white"
            >
              <QrCode className="h-5 w-5 mr-2" />
              Scan QR Code
            </Button>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Il Nostro Menu</h2>
              <p className="text-muted-foreground">Choose from our authentic Italian dishes</p>
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="mb-6 flex-wrap h-auto">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="data-[state=active]:bg-[#009246] data-[state=active]:text-white"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuData
                      .filter((item) => item.category === category)
                      .map((item) => (
                        <MenuItem
                          key={item.id}
                          item={item}
                          quantity={getItemQuantity(item.id)}
                          onAdd={() => addToCart(item)}
                          onRemove={() => removeFromCart(item.id)}
                        />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
      </main>

      {/* QR Scanner Modal */}
      {showScanner && (
        <QRScanner
          onScanSuccess={handleScanSuccess}
          onClose={() => setShowScanner(false)}
        />
      )}

      {/* Cart Modal */}
      {showCart && (
        <Cart
          items={cart}
          onRemoveItem={deleteFromCart}
          onUpdateQuantity={updateQuantity}
          onCheckout={handleCheckout}
          onClose={() => setShowCart(false)}
        />
      )}

      {/* Footer */}
      <footer className="mt-16 py-6 border-t bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>🇮🇹 Buon Appetito! 🇮🇹</p>
        </div>
      </footer>
    </div>
  );
}
