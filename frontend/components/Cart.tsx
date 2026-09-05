"use client";

import { useAuth } from "@clerk/nextjs";
import { useCart } from "../context/CartContext";
import { ShoppingCart, ArrowRight, Trash2, Plus, Minus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const shopRoutes = new Set(["/products", "/create", "/upload"]);

export default function Cart() {
  const pathname = usePathname();
  const {
    items,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
  } = useCart();
  const router = useRouter();
  const { isLoaded, isSignedIn, userId } = useAuth();

  const shouldShowCart =
    pathname === "/" ||
    shopRoutes.has(pathname) ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/create") ||
    pathname.startsWith("/upload");

  if (!shouldShowCart) {
    return null;
  }

  const handleCheckoutClick = async () => {
    if (!isLoaded) {
      return;
    }

    if (cartCount === 0) {
      setIsCartOpen(false);
      router.push("/products");
      return;
    }

    if (!isSignedIn || !userId) {
      router.push("/sign-in?redirect_url=/checkout");
      return;
    }

    router.push("/checkout");
  };

  return (
    <>
      {/* Floating Bottom-Right Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative w-16 h-16 bg-neon-pink hover:bg-pink-600 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(255,20,147,0.4)] hover:shadow-[0_6px_30px_rgba(255,20,147,0.6)] hover:-translate-y-1 transition-all duration-300"
        >
          <ShoppingCart size={28} color="white" />
          <span className="absolute -top-2 -left-2 bg-purple-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 border-white dark:border-zinc-900">
            {cartCount}
          </span>
        </button>
      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <button
          type="button"
          aria-label="Close cart overlay"
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white dark:bg-zinc-900 shadow-2xl z-[101] transform transition-transform duration-300 flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950/50">
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 hover:text-neon-pink transition-colors"
          >
            <ArrowRight size={24} />
          </button>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {cartCount === 0 ? "Your Cart Is Empty" : "Your Cart"}
          </h2>
          <div className="bg-neon-pink/10 text-neon-pink px-3 py-1 rounded-md font-bold text-sm border border-neon-pink/20">
            {cartCount} Items
          </div>
        </div>

        {/* Body */}
        <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center justify-center">
          {cartCount === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium text-center">
              Check out our shop to see what&apos;s available
            </p>
          ) : (
            <div className="w-full space-y-6 flex-col flex justify-start h-full">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col border-b border-gray-100 dark:border-zinc-800 pb-5"
                >
                  {/* Top Row: Title, Details, and Delete */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="pr-4">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed line-clamp-2">
                        {item.details}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 dark:bg-zinc-800 dark:hover:bg-red-900/20 p-2 rounded-full transition-colors mt-1 flex-shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Bottom Row: Quantity Controls and Total Price */}
                  <div className="flex justify-between items-center">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4 border border-gray-200 dark:border-zinc-700 rounded-full px-3 py-1.5 bg-gray-50 dark:bg-zinc-800/50">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className={`text-gray-500 hover:text-neon-pink transition p-1 ${
                          item.quantity <= 1
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold text-sm dark:text-white w-4 text-center select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="text-gray-500 hover:text-neon-pink transition p-1"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Price Calculation */}
                    <div className="text-right">
                      <div className="text-xs text-gray-400 dark:text-gray-500 line-through hidden md:block mb-0.5">
                        {item.quantity > 1 && `$${item.price.toFixed(2)} each`}
                      </div>
                      <span className="font-black text-xl text-[#00BFFF]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950">
          <div className="flex justify-between items-center mb-6">
            <span className="font-bold text-lg text-gray-600 dark:text-gray-300">
              Total
            </span>
            <span className="font-black text-2xl text-gray-900 dark:text-white">
              ${cartTotal.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleCheckoutClick}
            className="w-full py-4 bg-neon-pink hover:bg-pink-600 text-white font-bold rounded-full transition-all duration-300 shadow-[0_4px_14px_0_rgba(255,20,147,0.39)] hover:shadow-[0_6px_20px_rgba(255,20,147,0.23)] hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            {cartCount === 0 ? "Shop Now" : "Proceed to Checkout"}{" "}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
