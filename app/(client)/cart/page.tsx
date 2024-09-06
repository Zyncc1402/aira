import React from "react";
import {redirect} from "next/navigation";
import {getCart} from "@/lib/getCart";
import CartCard from "./components/cartCard";
import Image from "next/image";
import getSession from "@/lib/getSession";

export const metadata = {
    title: "Aira - Cart",
};

const Cart = async () => {
    const session = await getSession();

    if (!session?.user) {
        redirect("/signin?callbackUrl=/cart");
    }
    const getCartInfo = await getCart();
    if (getCartInfo) {
        return (
            <section className="pt-[40px] container">
                <div className="flex flex-col md:flex-row gap-y-52 md:gap-y-0">
                    {getCartInfo.items.length == 0 && (
                        <div className="h-full flex items-center justify-center">
                            <p className="font-medium text-xl">
                                There are no items in the Cart
                            </p>
                        </div>
                    )}
                    <CartCard items={getCartInfo} session={session}/>
                </div>
            </section>
        );
    } else {
        return (
            <section className="container flex flex-col items-center justify-center h-screen">
                <Image
                    src={"/empty-cart.svg"}
                    width={500}
                    height={500}
                    alt="empty cart"
                />
                <h1 className="font-medium text-xl mt-5">Cart is empty</h1>
            </section>
        );
    }
};

export default Cart;
