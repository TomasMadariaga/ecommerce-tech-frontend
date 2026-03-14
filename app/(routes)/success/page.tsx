"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PageSuccess = () => {
  const router = useRouter();
  return (
    <div className="max-w-5xl p-4 mx-auto sm:py-16 sm:px-24">
      <div className="flex flex-col gap-5 sm:gap-2 sm:flex-row">
        <div className="flex justify-center md:min-w-100">
          <Image
            src="/success.jpg"
            alt="Success"
            width={250}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-3xl">Gracias por comprar!</h1>
          <p className="my-3">
            En breve, nuestro equipo se pondra manos a la obra para seleccionar
            los componentes de alta calidad y preparar tu envio con cuidado y
            dedicación.
          </p>
          <p className="my-3">Gracias por confiar en nosotros.</p>
          <p className="my-3">Disfruta tus productos!</p>
          <Button onClick={() => router.push("/")}>Return to the store</Button>
        </div>
      </div>
    </div>
  );
};

export default PageSuccess;
