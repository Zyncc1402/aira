"use client";

import Spinner from "@/components/loadingSpinner";
import {Button} from "@/components/ui/button";
import {useFormStatus} from "react-dom";
import {IoCartOutline} from "react-icons/io5";
import {Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger,} from "@/components/ui/drawer"
import {RefObject} from "react";
import Image from "next/image";
import {Product} from "@prisma/client";
import formatCurrency from "@/lib/formatCurrency";
import {capitalizeFirstLetter} from "@/lib/caplitaliseFirstLetter";


export default function FormSubmitButton({product, size, buttonRef}: {
    product: Product,
    size: string | null,
    buttonRef: RefObject<HTMLButtonElement>
}) {
    const {pending, data} = useFormStatus();
    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    <button hidden ref={buttonRef}></button>
                </DrawerTrigger>
                <DrawerContent className={'h-[50vh]'}>
                    <div className={'container py-[50px] flex items-center justify-center flex-col'}>
                        <DrawerTitle>{product.title}</DrawerTitle>
                        <DrawerDescription>has been added to Cart</DrawerDescription>
                        <Image src={product.images[0]} alt={'Cart Item'} height={200} width={200}
                               className={'rounded-lg animate-bounce mt-5 aspect-square object-cover'}/>
                        <h1 className={'font-semibold mt-3 text-xl'}>{formatCurrency(product.price).split('.')[0]}</h1>
                        <h1 className={'font-medium text-muted-foreground mt-2 text-md'}>Size
                            - {(size == "sm" && "Small") ||
                                (size == "md" && "Medium") ||
                                (size == "lg" && "Large") ||
                                (size == "xl" && "XL")}</h1>
                        <h1 className={'font-medium text-muted-foreground mt-1 text-md'}>Color
                            - {capitalizeFirstLetter(product.color[0])}</h1>
                    </div>
                </DrawerContent>
            </Drawer>
            <Button
                aria-label="Button"
                className={`rounded-sm w-full py-3 md:py-6 ${
                    pending && "hover:cursor-progress font-semibold"
                }`}
                variant={"secondary"}
                size={"lg"}
                type="submit"
                disabled={pending}
            >
                <IoCartOutline className={`mr-3 ${pending && "hidden"}`} size={27}/>
                {pending ? <Spinner size={30}/> : `Add to cart`}
            </Button>
        </>
    );
}
