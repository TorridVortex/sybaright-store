"use client";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/useCart";

export default function Header() {
  const { itemCount, setIsOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            SYBARIGHT
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-gray-500 transition">Home</Link>
            <Link href="/lookbook" className="hover:text-gray-500 transition">Lookbook</Link>
          </nav>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="relative p-2 hover:bg-gray-100 rounded-full transition"
        >
          <ShoppingBag className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-black rounded-full">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
