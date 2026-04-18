import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartState {
  cartId: string | null;
  itemCount: number;
  isOpen: boolean;
  setCartId: (id: string) => void;
  setItemCount: (count: number) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      cartId: null,
      itemCount: 0,
      isOpen: false,
      setCartId: (id) => set({ cartId: id }),
      setItemCount: (count) => set({ itemCount: count }),
      setIsOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: 'sybaright-cart',
    }
  )
);
