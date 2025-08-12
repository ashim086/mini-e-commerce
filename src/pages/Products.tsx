import { useState } from "react";
import { useProducts } from "../hooks/useProducts.ts";
import useCartStore from "../store/cartStore.ts";
import PaginationComponent from "../components/ui/shared/Pagination.tsx";
import ProductCard from "../components/ui/shared/ProductCard.tsx";

export default function Products() {
  const [page, setPage] = useState(1);
  const limit = 6;
  const { addToCart } = useCartStore();

  const { data: allProducts = [], isLoading, isError } = useProducts();

  const totalPages = Math.ceil(allProducts.length / limit);

  const currentProducts = allProducts.slice((page - 1) * limit, page * limit);

  if (isLoading) return <p className="p-4 text-center">Loading products...</p>;
  if (isError)
    return (
      <p className="p-4 text-center text-red-500">Error loading products.</p>
    );

  return (
    <div className="p-4">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProducts.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <PaginationComponent
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
