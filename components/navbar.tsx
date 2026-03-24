"use client";

import { useRouter } from "next/navigation";
import { BaggageClaim, Heart, ShoppingCart, User, LogOut } from "lucide-react";
import { MenuList } from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const cart = useCart();
  const { lovedItems } = useLovedProducts();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleUserClick = () => {
    if (user) {
      setShowUserMenu(!showUserMenu);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl relative">
      <h1 className="sm:text-3xl text-lg font-semibold" onClick={() => router.push("/")}>
        Componentify
      </h1>

      <div className="items-center justify-between hidden sm:flex">
        <MenuList />
      </div>

      <div className="flex sm:hidden">
        <ItemsMenuMobile />
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-7 relative">
        {cart.items.length === 0 ? (
          <ShoppingCart
            strokeWidth="1"
            className="cursor-pointer"
            onClick={() => router.push("/cart")}
          />
        ) : (
          <div className="flex gap-1" onClick={() => router.push("/cart")}>
            <BaggageClaim strokeWidth={1} className="cursor-pointer" />
            <span>{cart.items.length}</span>
          </div>
        )}

        <Heart
          strokeWidth="1"
          className={`cursor-pointer ${lovedItems.length > 0 && "fill-black dark:fill-white"}`}
          onClick={() => router.push("/loved-products")}
        />

        <div className="relative">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={handleUserClick}
          >
            <User strokeWidth={1} />
            {user && (
              <span className="text-sm hidden sm:inline">{user.username}</span>
            )}
          </div>

          {user && showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border">
              <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b">
                <p className="font-semibold">{user.username}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>

              <button
                onClick={() => {
                  router.push("/profile");
                  setShowUserMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Mi Perfil
              </button>

              <button
                onClick={() => {
                  router.push("/orders");
                  setShowUserMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Mis Pedidos
              </button>

              <button
                onClick={() => {
                  logout();
                  setShowUserMenu(false);
                  router.push("/");
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <LogOut size={16} />
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>

        <ToggleTheme />
      </div>

      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
