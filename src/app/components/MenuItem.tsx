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
        <div className="h-48 overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
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
        <span className="text-xl font-bold text-[#8B4513]">€{item.price.toFixed(2)}</span>
        
        <div className="flex items-center gap-2">
          {quantity > 0 ? (
            <>
              <Button
                size="icon"
                variant="outline"
                onClick={onRemove}
                className="h-8 w-8 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513]/10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <Button
                size="icon"
                onClick={onAdd}
                className="h-8 w-8 bg-[#8B4513] hover:bg-[#6B3410]"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button
              onClick={onAdd}
              size="sm"
              className="bg-[#B8860B] hover:bg-[#8B6914] text-white"
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