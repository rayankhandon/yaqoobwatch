import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem, WishlistItem, ToastMessage } from '../types';

interface ShopContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  quickViewProduct: Product | null;
  isQuickViewOpen: boolean;
  isSearchOpen: boolean;
  isCartDrawerOpen: boolean;
  isMobileMenuOpen: boolean;
  toasts: ToastMessage[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedStrap?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  cartSubtotal: number;
  cartItemCount: number;
  wishlistCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'aurelis_cart_v1';
const WISHLIST_STORAGE_KEY = 'aurelis_wishlist_v1';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist Cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Persist Wishlist
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Toast System
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Operations
  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedColor?: string,
    selectedStrap?: string
  ) => {
    const color = selectedColor || product.colors[0];
    const strap = selectedStrap || product.strapMaterial;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedColor: color, selectedStrap: strap }];
      }
    });

    addToast(`Added "${product.name}" to your bag.`, 'success');
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string, selectedColor?: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => {
        if (item.product.id !== productId) return true;
        if (selectedColor && item.selectedColor !== selectedColor) return true;
        return false;
      })
    );
    addToast('Item removed from your bag.', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Operations
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.product.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.product.id !== product.id));
      addToast(`Removed "${product.name}" from your wishlist.`, 'info');
    } else {
      setWishlist((prev) => [...prev, { product, addedAt: new Date().toISOString() }]);
      addToast(`Added "${product.name}" to your wishlist.`, 'success');
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.product.id === productId);
  };

  // Quick View Modal
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  // Search Modal
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  // Cart Drawer
  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  // Totals calculation
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        quickViewProduct,
        isQuickViewOpen,
        isSearchOpen,
        isCartDrawerOpen,
        isMobileMenuOpen,
        toasts,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        openQuickView,
        closeQuickView,
        openSearch,
        closeSearch,
        openCartDrawer,
        closeCartDrawer,
        setIsMobileMenuOpen,
        addToast,
        removeToast,
        cartSubtotal,
        cartItemCount,
        wishlistCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
