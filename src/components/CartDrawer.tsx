"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { useCart } from "@/store/useCart";
import { getCartDetails, redirectToCheckout } from "@/lib/fourthwall";
import Image from "next/image";

export default function CartDrawer() {
  const { isOpen, setIsOpen, cartId } = useCart();
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && cartId) {
      setLoading(true);
      getCartDetails(cartId).then(data => {
        setCart(data);
        setLoading(false);
      });
    }
  }, [isOpen, cartId]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }} 
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold tracking-tight">CART</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="w-6 h-6 animate-spin text-black" />
                </div>
              ) : cart && cart.lines?.length > 0 ? (
                <div className="space-y-6">
                  {cart.lines.map((line: any) => (
                    <div key={line.id} className="flex gap-4">
                      <div className="relative w-20 h-24 bg-gray-50 border border-gray-100">
                        {line.variant.image && (
                          <Image src={line.variant.image.url} alt="product" fill className="object-cover" />
                        )}
                      </div>
                      <div className="flex-1 shrink-0">
                        <h4 className="font-semibold text-sm">{line.product.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{line.variant.name}</p>
                        <p className="font-bold text-sm mt-2">${(line.value.amount).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-20 text-center">
                  <ShoppingBag className="w-12 h-12 text-gray-300 mb-4" />
                  <p className="text-gray-500 font-medium">Your cart is empty.</p>
                </div>
              )}
            </div>

            {cart && cart.lines?.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between font-bold mb-4">
                  <span>Subtotal</span>
                  <span>${(cart.subtotal.amount).toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => redirectToCheckout(cartId!)}
                  className="w-full bg-[#050505] text-white font-bold py-4 hover:bg-black/90 transition rounded-sm"
                >
                  CHECKOUT SECURELY
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
