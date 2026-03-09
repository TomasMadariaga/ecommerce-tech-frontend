import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "./ui/popover";
import { Menu } from "lucide-react";
import Link from "next/link";

const ItemsMenuMobile = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <Menu />
            </PopoverTrigger>
            <PopoverContent>
                <Link href="/category/processor" className="block">
                    Procesadores
                </Link>
                <Link href="/category/video-card" className="block">
                    Placas de video
                </Link>
                <Link href="/category/motherboard" className="block">
                    Motherboard
                </Link>
                <Link href="/category/memory" className="block">
                    Memoria RAM
                </Link>
            </PopoverContent>
        </Popover>
    );
};

export default ItemsMenuMobile;
