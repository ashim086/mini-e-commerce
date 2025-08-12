import { useMemo } from "react";
import useCartStore from "../store/cartStore";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();

  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  if (cart.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        🛒 Your cart is empty
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Shopping Cart ({totalItems} items)
      </h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <Card key={item.id} className="flex flex-col sm:flex-row gap-4">
            <CardHeader className="w-full sm:w-32">
              <img
                src={item.images?.[0] || "/placeholder.png"}
                alt={item.title}
                className="h-24 w-24 object-contain"
              />
            </CardHeader>
            <CardContent className="flex-1">
              <CardTitle>{item.title}</CardTitle>
              <p className="text-sm text-gray-500">${item.price}</p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <span className="px-2">{item.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col justify-between">
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 border-t pt-4 flex justify-between items-center">
        <div className="text-lg font-semibold">
          Total: ${totalPrice.toFixed(2)}
        </div>
        <Button
          variant="default"
          onClick={() => alert("Checkout coming soon!")}
        >
          Checkout
        </Button>
      </div>

      <div className="mt-4">
        <Button variant="outline" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
}
