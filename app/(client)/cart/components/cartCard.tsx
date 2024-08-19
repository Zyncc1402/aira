// @ts-nocheck
"use client";
import {deleteCartItem, updateCartItemQuantity} from "@/actions/action";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {capitalizeFirstLetter} from "@/lib/caplitaliseFirstLetter";
import formatCurrency from "@/lib/formatCurrency";
import {CartWithCartItems} from "@/lib/types";
import {useSession} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {AiOutlineDelete} from "react-icons/ai";

type Props = {
    items: CartWithCartItems;
};

export default function CartCard({items}: Props) {
    const {data: session} = useSession();

    function handleQuantityChange(
        event: React.ChangeEvent<HTMLSelectElement>,
        id: string
    ) {
        if (session?.user.id) {
            updateCartItemQuantity(items.userId, Number(event.target.value), id);
        }
    }

    return (
        <div className="flex-1 flex gap-y-5 flex-col w-full relative mr-10">
            {items?.items.map((item) => (
                <div key={item.product.id} className="flex gap-5 w-full">
                    <Link href={`/${item.product.category}/${item.product.id}`}>
                        <Image
                            src={item.product.images[0]}
                            height={200}
                            width={200}
                            alt="Image"
                            className="object-cover aspect-square rounded-lg"
                            priority
                        />
                    </Link>
                    <div className="relative">
                        <h1>{item.product.title}</h1>
                        <h2>{capitalizeFirstLetter(item.product.category)}</h2>
                        <h2>{capitalizeFirstLetter(item.product.color[0])}</h2>
                        <p>{formatCurrency(item.product.price).split(".")[0]}</p>
                        <form>
                            <label htmlFor="quantity">Quantity</label>
                            <select
                                className="mx-2 p-1 focus:border-0"
                                name="quantity"
                                id="quantity"
                                onChange={(e) => handleQuantityChange(e, item.id)}
                                defaultValue={item.quantity}
                            >
                                <option value={1}
                                        disabled={item.size == 'sm' && item.product.quantity.sm < 1 ||
                                            item.size == 'md' && item.product.quantity.md < 1 ||
                                            item.size == 'lg' && item.product.quantity.lg < 1 ||
                                            item.size == 'xl' && item.product.quantity.xl < 1
                                        }
                                        className={'disabled:text-muted'}
                                >1
                                </option>
                                <option value={2}
                                        disabled={item.size == 'sm' && item.product.quantity.sm < 2 ||
                                            item.size == 'md' && item.product.quantity.md < 2 ||
                                            item.size == 'lg' && item.product.quantity.lg < 2 ||
                                            item.size == 'xl' && item.product.quantity.xl < 2
                                        }
                                        className={'disabled:text-muted'}
                                >2
                                </option>
                                <option value={3}
                                        disabled={item.size == 'sm' && item.product.quantity.sm < 3 ||
                                            item.size == 'md' && item.product.quantity.md < 3 ||
                                            item.size == 'lg' && item.product.quantity.lg < 3 ||
                                            item.size == 'xl' && item.product.quantity.xl < 3
                                        }
                                        className={'disabled:text-muted'}
                                >3
                                </option>
                                <option value={4}
                                        disabled={item.size == 'sm' && item.product.quantity.sm < 4 ||
                                            item.size == 'md' && item.product.quantity.md < 4 ||
                                            item.size == 'lg' && item.product.quantity.lg < 4 ||
                                            item.size == 'xl' && item.product.quantity.xl < 4
                                        }
                                        className={'disabled:text-muted'}
                                >4
                                </option>
                                <option value={5}
                                        disabled={item.size == 'sm' && item.product.quantity.sm < 5 ||
                                            item.size == 'md' && item.product.quantity.md < 5 ||
                                            item.size == 'lg' && item.product.quantity.lg < 5 ||
                                            item.size == 'xl' && item.product.quantity.xl < 5
                                        }
                                        className={'disabled:text-muted'}
                                >5
                                </option>
                            </select>
                        </form>
                        <Button
                            variant={"link"}
                            size={"icon"}
                            onClick={() =>
                                deleteCartItem(item.id, session?.user.id as string)
                            }
                        >
                            <AiOutlineDelete size={27}/>
                        </Button>
                    </div>
                    <div className="flex flex-col justify-between">
                        <Badge variant="secondary">
                            {(item.size == "sm" && "Small") ||
                                (item.size == "md" && "Medium") ||
                                (item.size == "lg" && "Large") ||
                                (item.size == "xl" && "XL")}
                        </Badge>
                    </div>
                </div>
            ))}
        </div>
    );
}
