import { getProducts } from "@/lib/fourthwall";
import dynamic from "next/dynamic";

// 1. We dynamically import the ProductCard.
// 2. We set ssr: false so Vercel skips building Framer Motion on the server.
// 3. We add a sleek loading skeleton to maintain the high-end aesthetic.
const ProductCard = dynamic(() => import("@/components/ProductCard"), { 
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[4/5] bg-gray-50 animate-pulse rounded-sm border border-gray-100"></div>
  )
});

export default async function Lookbook() {
  const products = await getProducts();

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase font-[family-name:var(--font-geist-sans)]">
          The <br/> Lookbook
        </h1>
        <p className="mt-4 text-gray-500 max-w-md font-[family-name:var(--font-inter)] leading-relaxed">
          Complete seasonal collection. High saturation, minimal form.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
