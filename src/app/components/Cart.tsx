import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Separator } from '@/app/components/ui/separator';
import { ShoppingCart, Trash2, X } from 'lucide-react';
import type { MenuItemType } from './MenuItem';

interface CartItem extends MenuItemType {
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onRemoveItem: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onCheckout: () => void;
  onClose: () => void;
}

export function Cart({ items, onRemoveItem, onUpdateQuantity, onCheckout, onClose }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceFee = subtotal * 0.1;
  const total = subtotal + serviceFee;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center">
      <Card className="w-full max-w-md h-[80vh] sm:h-auto sm:max-h-[80vh] flex flex-col rounded-t-2xl sm:rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Order ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <Separator />

        <ScrollArea className="flex-1 px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mb-2 opacity-50" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        €{item.price.toFixed(2)} × {item.quantity}
                      </span>
                      <span className="font-semibold">
                        €{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8"
                        aria-label={`Decrease quantity for ${item.name}`}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button
                        size="icon"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 bg-[#009246] hover:bg-[#007A3A]"
                        aria-label={`Increase quantity for ${item.name}`}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <Separator />

        <CardFooter className="flex flex-col gap-3 pt-4">
          <div className="w-full text-sm text-muted-foreground space-y-2">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Service fee (10%)</span>
              <span>€{serviceFee.toFixed(2)}</span>
            </div>
          </div>
          <div className="w-full flex items-center justify-between text-lg font-bold">
            <span>Total</span>
            <span>€{total.toFixed(2)}</span>
          </div>
          <Button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full bg-[#009246] hover:bg-[#007A3A] text-white"
            size="lg"
          >
            Place Order
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
