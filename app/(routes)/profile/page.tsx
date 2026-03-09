"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="text-center py-20">Cargando...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>
      
      <div className="rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm">Usuario</label>
            <p className="text-lg font-medium">{user.username}</p>
          </div>
          
          <div>
            <label className="text-sm">Email</label>
            <p className="text-lg font-medium">{user.email}</p>
          </div>
          
          <div className="pt-4">
            <Button 
              variant="outline" 
              onClick={() => router.push("/orders")}
              className="cursor-pointer mr-2"
            >
              Ver mis pedidos
            </Button>
            
            <Button 
              variant="destructive"
              className="cursor-pointer"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}