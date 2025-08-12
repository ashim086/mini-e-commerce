import { create } from "zustand";
import toast from "react-hot-toast";

interface Product {
    id: string | number;
    title: string;
    price: number;
    images: string[];
    quantity?: number;
}

interface CartState {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string | number) => void;
    clearCart: () => void;
}

const useCartStore = create<CartState>((set, get) => ({
    cart: [],

    addToCart: (product) => {
        const { cart } = get();
        const exists = cart.find((p) => p.id === product.id);

        if (exists) {
            toast.error("Product already exists");
            return;
        }

        toast.success("Product added to cart");
        set({ cart: [...cart, { ...product, quantity: 1 }] });
    },

    removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id),
    })),

    clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
