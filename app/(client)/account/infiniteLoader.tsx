"use client";

import {InfiniteAccountOrders} from "@/actions/infiniteData";
import {Button} from "@/components/ui/button";
import formatCurrency from "@/lib/formatCurrency";
import {order} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {CgSpinner} from "react-icons/cg";
import {useInView} from "react-intersection-observer";

let skip = 5;

export default function InfiniteLoader({id}: { id: string }) {
    const {ref, inView} = useInView();
    const [data, setData] = useState<order[]>([]);
    const [disableLoader, setDisableLoader] = useState(false);
    useEffect(() => {
        if (inView) {
            InfiniteAccountOrders(skip, id).then((res) => {
                if (data != undefined) {
                    setData([...data, ...res]);
                }
                if (res.length == 0) {
                    setDisableLoader(true);
                }
            });
            skip += 5;
            console.log(data);
        }
    }, [inView]);

    return (
        <div>
            {data?.map((order) => (
                <div
                    key={order.id}
                    className="w-fit mt-5 mb-10 flex flex-col border-[1px] border-secondary rounded-xl"
                >
                    <div className="flex gap-x-10 gap-y-5 bg-secondary rounded-tl-xl rounded-tr-xl p-4 flex-wrap">
                        <div>
                            <h1>Order Placed </h1>
                            <h1>{order.createdAt.toDateString().slice(4)}</h1>
                        </div>
                        <div>
                            <h1>Total</h1>
                            <h1>{formatCurrency(order.price).split(".")[0]}</h1>
                        </div>
                        <div>
                            <h1>Ship To</h1>
                            <h1>Chandan</h1>
                        </div>
                        <div>
                            <h1>Order ID</h1>
                            <h1>{order.orderId.split("-").pop()}</h1>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Link href={`/${order.category}/${order.productId}`}>
                            <Image
                                src={order.image}
                                height={150}
                                width={150}
                                priority
                                alt="Product image"
                                className="aspect-square object-cover rounded-bl-xl"
                            />
                        </Link>
                        <div className="flex flex-col gap-y-3 mt-3 font-medium">
                            <h1>{order.title}</h1>
                            <Link href={`/reviews/add/${order.productId}`}>
                                <Button variant={"secondary"}>Write a Review</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
            {disableLoader !== true && (
                <div ref={ref} className="w-full flex items-center justify-center">
                    <CgSpinner className="animate-spin my-10" size={40}/>
                </div>
            )}
        </div>
    );
}
