"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter()
    return ( <div className="flex flex-col md:flex-row items-center min-h-[70vh] justify-center sm:px-24 md:gap-28 gap-12">
        <h1 className="text-4xl">Pagina no encontrada</h1>
        <div className="flex flex-col items-center gap-5">
            <p>La pagina no ha sido encontrada</p>
            <Button className="w-fit" onClick={() => router.push("/")}>Volver al inicio</Button>
        </div>
    </div> );
}
 
export default Page;