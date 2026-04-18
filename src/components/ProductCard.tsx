"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/store/useCart";
import { addToCartApi } from "@/lib/fourthwall";
import { Loader2 } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  const { cartId, setCartId, setIsOpen, setItemCount, itemCount } = useCart();
  const [adding, setAdding] = useState(false);

  const variantId = product.variants?.[0]?.id;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variantId) return;
    setAdding(true);
    try {
      const resp = await addToCartApi(cartId, variantId, 1);
      if (!cartId && resp.id) {
        setCartId(resp.id);
      }
      setItemCount(itemCount + 1);
      setIsOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden mb-4">
        {product.images?.[0]?.url && (
            <Image 
                src={product.images[0].url} 
                alt={product.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" 
            />
        )}
        
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            disabled={adding}
            onClick={handleQuickAdd}
            className="w-full bg-white text-black py-4 font-bold text-sm uppercase tracking-widest hover:bg-gray-100 transition disabled:opacity-70 flex justify-center items-center h-[52px]"
          >
            {adding ? <Loader2 className="w-5 h-5 animate-spin" /> : "Quick Add"}
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold tracking-tight text-sm uppercase">{product.name}</h3>
        </div>
      </div>
    </motion.div>
  );
}
