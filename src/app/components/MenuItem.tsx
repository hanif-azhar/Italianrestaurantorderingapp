import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Plus, Minus } from 'lucide-react';

export interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  vegetarian?: boolean;
}

interface MenuItemProps {
  item: MenuItemType;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export function MenuItem({ item, quantity, onAdd, onRemove }: MenuItemProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {item.image && (
        <div className="h-40 bg-gradient-to-br from-[#009246] to-[#DA291C] flex items-center justify-center text-white text-2xl">
          {item.name.substring(0, 2)}
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          {item.vegetarian && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              🌱 Vegetarian
            </Badge>
          )}
        </div>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      
      <CardFooter className="flex items-center justify-between">
        <span className="text-xl font-bold">€{item.price.toFixed(2)}</span>
        
        <div className="flex items-center gap-2">
          {quantity > 0 ? (
            <>
              <Button
                size="icon"
                variant="outline"
                onClick={onRemove}
                className="h-8 w-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <Button
                size="icon"
                onClick={onAdd}
                className="h-8 w-8 bg-[#009246] hover:bg-[#007A3A]"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button
              onClick={onAdd}
              size="sm"
              className="bg-[#DA291C] hover:bg-[#B82218]"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
