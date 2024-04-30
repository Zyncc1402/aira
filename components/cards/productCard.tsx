"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  addToCart,
  deleteCartItem,
  deleteProduct,
  unarchiveProduct,
} from "@/actions/action";
import { MdOutlineDelete } from "react-icons/md";
import { RiInboxUnarchiveLine } from "react-icons/ri";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IoCartOutline } from "react-icons/io5";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { IoMdHeart } from "react-icons/io";

type CardProps = {
  image: string;
  title: string;
  category?: string;
  id: string;
  price: number;
  showProductActions?: boolean;
  showIcons?: boolean;
  showAdminLinks?: boolean;
};

interface Item {
  id: number | string;
  title: string;
  price: number;
  image: string;
}

const ProductCard = ({
  image,
  title,
  price,
  id,
  showProductActions,
  showIcons,
  showAdminLinks,
  category,
}: CardProps) => {
  const { data: session } = useSession();

  const [cartIconDisabled, setCartIconDisabled] = useState(false);
  const [heart, setHeart] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<object[]>([]);

  const formatted = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "INR",
  }).format(price);

  function handleAddToCart(title: string, price: number, id: string) {
    if (!session?.user) {
      toast.error("You must be logged in to add items to the Cart");
    } else {
      addToCart(id, session.user.id as string);
      setCartIconDisabled((prev) => !prev);
      toast(`Added ${title} to Cart`, {
        description: `${formatted}`,
        action: {
          label: "Undo",
          onClick: () => {
            setCartIconDisabled(false);
            deleteCartItem(id);
          },
        },
      });
    }
  }

  function handleAddToWishlist(
    title: string,
    id: string,
    image: string,
    price: number
  ) {
    const newItem = [
      ...wishlistItems,
      {
        title,
        id,
        image,
        price,
      },
    ];
    setWishlistItems(newItem);

    // localStorage.setItem("wishlist", `${JSON.stringify(wishlistItems)}`);

    setHeart((prev) => !prev);

    // toast(`Added ${title} to Wishlist`, {
    //   description: `${formatted}`,
    // });
  }

  return (
    <div className="flex flex-col productCard rounded-[4px] relative overflow-hidden text-left">
      {showIcons && (
        <button aria-label="Button">
          <IoMdHeart
            onClick={() => {
              handleAddToWishlist(title, id, image, price);
            }}
            color={heart ? "#dc6e73" : "8a8a8a"}
            size={23}
            className="absolute top-2 right-2 cursor-pointer bg-red"
          />
        </button>
      )}

      <Link
        aria-label="navigation-link"
        href={
          showAdminLinks
            ? `/admin/products/${id}`
            : `/categories/${category}/${id}`
        }
      >
        <Image
          src={image}
          width={700}
          height={700}
          alt="product image"
          priority={true}
        />
      </Link>
      <div className="p-2 gap-4 flex justify-between w-[100%]">
        <div className="flex w-[100%] items-center justify-between gap-4">
          <div>
            <Link
              aria-label="navigation-link"
              href={
                showAdminLinks
                  ? `/admin/products/${id}`
                  : `/categories/${category}/${id}`
              }
            >
              <div className="text-slate-500 text-sm">
                <h1>{title}</h1>
              </div>
            </Link>
            <p className="text-base text-md text-slate-600">
              {formatted.split(".")[0]}
            </p>
          </div>
          {showIcons && (
            <button
              aria-label="Button"
              onClick={() => handleAddToCart(title, price, id)}
              disabled={cartIconDisabled}
              className="disabled:opacity-30"
            >
              <IoCartOutline size={27} />
            </button>
          )}
          {showProductActions && (
            <div className="flex gap-2">
              <AlertDialog>
                <AlertDialogTrigger>
                  <div className="font-bold text-white bg-slate-900 p-2 rounded-lg">
                    <RiInboxUnarchiveLine size={25} />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This product will be un-archived and will be shown on the
                      store.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => unarchiveProduct(id)}>
                      Un-Archive
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger>
                  <div className="flex items-center justify-center text-white bg-red-600 p-2 rounded-lg">
                    <MdOutlineDelete size={25} />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This product will be <b>deleted</b> forever from the
                      server and will not be shown on the store anymore
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteProduct(id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
