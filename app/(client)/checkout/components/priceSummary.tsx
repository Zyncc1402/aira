"use client"

import React, {useMemo} from "react";
import {useCheckoutStore} from "@/context/checkoutStore";
import formatCurrency from "@/lib/formatCurrency";
import {redirect} from "next/navigation";
import {Button} from "@/components/ui/button";
import {SiPhonepe} from "react-icons/si";
import {Drawer, DrawerContent, DrawerTrigger,} from "@/components/ui/drawer"
import Image from "next/image";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useAddress} from "@/context/address";
import {toast} from "@/components/ui/use-toast";
import {Pay} from "@/actions/pay";
import {SubmitPayButton} from "@/components/submitButton";

export default function PriceSummary() {
    const {checkoutItems} = useCheckoutStore()
    const price = useMemo(() => {
        return checkoutItems?.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
        );
    }, [checkoutItems]);
    if(checkoutItems?.length == 0) redirect('/cart')
    const {selectedAddress} = useAddress()

    async function handlePayButton () {
        if (!selectedAddress) {
            toast({
                title: "Select an Address",
                variant: "destructive",
            })
            return null;
        }
        const products = checkoutItems?.map(item => {
            return {item: item.product, quantity: item.quantity, size: item.size};
        })
        await Pay(products, selectedAddress)
    }

    return (
        <div className="flex-1">
            <h1 className={'font-medium text-2xl'}>Summary</h1>
            <div className="flex items-center"><h1 className={'font-medium'}>Subtotal : {formatCurrency(price ?? 0).split('.')[0]}</h1>
                <Drawer>
                    <DrawerTrigger asChild><Button variant={'link'} onClick={() => {}}>View details</Button></DrawerTrigger>
                    <DrawerContent className={'max-h-[70vh]'}>
                        <div className={'container'}>
                            <ScrollArea className="h-[50vh]">
                                {checkoutItems?.map((item, index) => (
                                    <div key={index}>
                                        <Image src={item.product.images[0]} alt={'checkout item image'} width={200} height={200} className={'aspect-square object-cover'}/>
                                        <h1>{`${formatCurrency(item.product.price).split('.')[0]} x ${item.quantity} = ${formatCurrency(item.product.price * item.quantity).split('.')[0]}`}</h1>
                                    </div>
                                ))}
                            </ScrollArea>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
            <div className={'flex flex-col justify-center items-center'}>
                <form action={handlePayButton} className={'w-full'}>
                    <SubmitPayButton/>
                </form>
                <div className="flex items-center justify-center gap-1 mt-3"><p className={'text-sm text-muted-foreground text-center'}>Checkout Securely using
                    PhonePe</p>
                    <SiPhonepe size={20} color={'purple'}/>
                    <p className={'text-sm text-muted-foreground text-center'}> Payment Gateway</p></div>
            </div>
        </div>
    )
}