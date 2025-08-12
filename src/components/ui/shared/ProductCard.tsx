import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
    id: string | number;
    title: string;
    price: number;
    images: string[];
}

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    return (
        <Card className="flex flex-col justify-between">
            <CardHeader>
                <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-32 mx-auto object-contain"
                />
            </CardHeader>
            <CardContent>
                <CardTitle className="line-clamp-2">{product.title}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">${product.price}</p>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full"
                    onClick={() => onAddToCart(product)}
                >
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}
