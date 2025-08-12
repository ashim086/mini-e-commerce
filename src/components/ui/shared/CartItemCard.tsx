import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CartItem {
  id: string | number;
  title: string;
  price: number;
  quantity: number;
  images?: string[];
}

interface CartItemCardProps {
  item: CartItem;
  onRemove: (id: string | number) => void;
  onQuantityChange: (id: string | number, newQuantity: number) => void;
}
export default function CartItemCard({ item, onRemove, onQuantityChange }: CartItemCardProps) {
  return (
    <Card className="flex flex-col sm:flex-row gap-4">
      {/* Product Image */}
      <CardHeader className="w-full sm:w-32 flex items-center justify-center">
        <img
          src={item.images?.[0] || "/placeholder.png"}
          alt={item.title}
          className="h-24 w-24 object-contain"
        />
      </CardHeader>

      {/* Product Info */}
      <CardContent className="flex-1">
        <CardTitle className="line-clamp-2">{item.title}</CardTitle>
        <p className="text-sm text-gray-500">${item.price}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </Button>
          <span className="px-2">{item.quantity}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
      </CardContent>

      {/* Remove Button */}
      <CardFooter className="flex flex-col justify-between">
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}
