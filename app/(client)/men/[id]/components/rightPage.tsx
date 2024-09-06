"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import formatCurrency from "@/lib/formatCurrency";
import { z } from "zod";
import { addToCart } from "@/actions/action";
import { useToast } from "@/components/ui/use-toast";
import { Products } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { BiTransferAlt } from "react-icons/bi";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { IoMdHeart, IoMdInformationCircleOutline } from "react-icons/io";
import AddToCartBtn from "./AddToCartBtn";
import { Session } from "next-auth";
import BuyButton from "./buyButton";

type Props = {
  product: Products;
  session: Session | null;
};

type wishlistItemsType = {
  id: string;
  title: string;
  image: string;
  price: number;
  category: string;
}[];

const sizeScheme = z.object({
  size: z.enum(["sm", "md", "lg", "xl"]),
  quantity: z.number().gt(0),
});

export default function RightPage({ product, session }: Props) {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { title, description, price, quantity, id, category, images } = product;
  const formatted = formatCurrency(price);
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3);
    setDate(currentDate);
  }, []);

  async function handleAddToCart() {
    if (!session?.user) {
      toast({
        variant: "destructive",
        title: "Must be logged in to add to cart",
      });
      return null;
    }
    if (searchParams.get("size") == "sm") {
      const validation = sizeScheme.safeParse({
        size: searchParams.get("size"),
        quantity: product.quantity?.sm,
      });
      if (!validation.success) {
        toast({
          variant: "destructive",
          title: "Please select a size to continue",
        });
        return null;
      }
    } else if (searchParams.get("size") == "md") {
      const validation = sizeScheme.safeParse({
        size: searchParams.get("size"),
        quantity: product.quantity?.md,
      });
      if (!validation.success) {
        toast({
          variant: "destructive",
          title: "Please select a size to continue",
        });
        return null;
      }
    } else if (searchParams.get("size") == "lg") {
      const validation = sizeScheme.safeParse({
        size: searchParams.get("size"),
        quantity: product.quantity?.lg,
      });
      if (!validation.success) {
        toast({
          variant: "destructive",
          title: "Please select a size to continue",
        });
        return null;
      }
    } else if (searchParams.get("size") == "xl") {
      const validation = sizeScheme.safeParse({
        size: searchParams.get("size"),
        quantity: product.quantity?.xl,
      });
      if (!validation.success) {
        toast({
          variant: "destructive",
          title: "Please select a size to continue",
        });
        return null;
      }
    } else {
      const validation = sizeScheme.safeParse({
        size: searchParams.get("size"),
      });
      if (!validation.success) {
        toast({
          variant: "destructive",
          title: "Please select a size to continue",
        });
        return null;
      }
    }
    const size = searchParams.get("size");
    if (size) {
      const result = await addToCart(id, size, session?.user.id as string);
      if (result?.exists) {
        toast({
          title: `${title} already in Cart`,
          variant: "destructive",
        });
      } else {
        toast({
          title: `Added ${title} to cart`,
        });
      }
    }
  }
  return (
    <div className="md:basis-1/2 flex flex-col gap-3 container">
      {session?.user.role === "Admin" ? (
        <Link href={"/admin/products/" + product.id}>
          <h1 className="text-3xl font-semibold">{title}</h1>
        </Link>
      ) : (
        <h1 className="text-3xl font-semibold">{title}</h1>
      )}
      <h1 className="text-xl font-medium">{formatted.split(".")[0]}</h1>
      <div className="flex flex-col md:items-center md:flex-row gap-6">
        <div className="flex-1">
          <form
            action={handleAddToCart}
            className="flex flex-col items-start gap-4"
          >
            {quantity?.sm == 0 &&
            quantity?.md == 0 &&
            quantity?.lg == 0 &&
            quantity?.xl == 0 ? (
              <></>
            ) : (
              <h1>Select a size</h1>
            )}
            <div className="flex gap-6 items-start mb-2 overflow-hidden flex-wrap">
              <div className="flex items-start justify-start gap-2 flex-wrap">
                {quantity?.sm !== 0 && (
                  <Link
                    scroll={false}
                    href={"?size=sm"}
                    replace
                    draggable={false}
                  >
                    <span className="flex items-center text-red-500 flex-col gap-2">
                      <Button
                        size={"lg"}
                        variant={"outline"}
                        className={`flex flex-col text-lg text-black border-2 ${
                          searchParams.get("size") == "sm" &&
                          "border-2 border-blue-500"
                        }`}
                      >
                        S
                      </Button>
                      {quantity && quantity?.sm < 5 && (
                        <span>{quantity?.sm} left</span>
                      )}
                    </span>
                  </Link>
                )}
                {quantity?.md !== 0 && (
                  <Link
                    scroll={false}
                    href={"?size=md"}
                    replace
                    draggable={false}
                  >
                    <span className="flex items-center text-red-500 flex-col gap-2">
                      <Button
                        size={"lg"}
                        variant={"outline"}
                        className={`flex flex-col text-lg border-2 text-black ${
                          searchParams.get("size") == "md" &&
                          "border-2 border-blue-500"
                        }`}
                      >
                        M
                      </Button>
                      {quantity && quantity?.md < 5 && (
                        <span>{quantity?.md} left</span>
                      )}
                    </span>
                  </Link>
                )}
                {quantity?.lg !== 0 && (
                  <Link
                    scroll={false}
                    href={"?size=lg"}
                    replace
                    draggable={false}
                  >
                    <span className="flex items-center text-red-500 flex-col gap-2">
                      <Button
                        size={"lg"}
                        variant={"outline"}
                        className={`flex flex-col text-lg border-2 text-black ${
                          searchParams.get("size") == "lg" &&
                          "border-2 border-blue-500"
                        }`}
                      >
                        L
                      </Button>
                      {quantity && quantity?.lg < 5 && (
                        <span>{quantity?.lg} left</span>
                      )}
                    </span>
                  </Link>
                )}
                {quantity?.xl !== 0 && (
                  <Link
                    scroll={false}
                    href={"?size=xl"}
                    replace
                    draggable={false}
                  >
                    <span className="flex items-center text-red-500 flex-col gap-2">
                      <Button
                        size={"lg"}
                        variant={"outline"}
                        className={`flex flex-col text-lg border-2 text-black ${
                          searchParams.get("size") == "xl" &&
                          "border-2 border-blue-500"
                        }`}
                      >
                        XL
                      </Button>
                      {quantity && quantity?.xl < 5 && (
                        <span>{quantity?.xl} left</span>
                      )}
                    </span>
                  </Link>
                )}
              </div>
            </div>
            <div className="flex gap-4 w-full flex-wrap flex-col md:flex-row">
              {quantity?.sm == 0 &&
              quantity?.md == 0 &&
              quantity?.lg == 0 &&
              quantity?.xl == 0 ? (
                <Button
                  disabled
                  aria-label="Button"
                  className="flex-1 rounded-sm py-3 md:py-6"
                  variant={"outline"}
                  size={"lg"}
                >
                  Out of stock
                </Button>
              ) : (
                <BuyButton
                  product={product}
                  cartItemInfo={{ size: searchParams.get("size"), quantity: 1 }}
                  session={session}
                />
              )}
              {quantity?.sm == 0 &&
              quantity?.md == 0 &&
              quantity?.lg == 0 &&
              quantity?.xl == 0 ? (
                <Button
                  disabled
                  aria-label="Button"
                  className="flex-1 rounded-sm py-3 md:py-6"
                  variant={"outline"}
                  size={"lg"}
                >
                  Out of stock
                </Button>
              ) : (
                <AddToCartBtn />
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4 w-fit text-gray-600">
        <div className="flex gap-5 items-center">
          <TbTruckDelivery size={30} />
          <div>
            Expected delivery by{" "}
            <span className="font-semibold">
              {date?.toString().slice(0, 11)}
            </span>{" "}
            <br />
            Free delivery
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <VscWorkspaceTrusted size={28} />
          <div>100% Genuine Product</div>
        </div>
        <div className="flex gap-5 items-center">
          <BiTransferAlt size={30} />
          <div>
            Hassle free 7 days Exchange <br />
            No Return
          </div>
        </div>
      </div>
      <div className="mt-4 flex font-semibold items-center gap-2">
        <IoMdInformationCircleOutline size={27} />
        Product Details
      </div>
      <div className="border-2 rounded-lg p-3 ">
        <div className="grid grid-cols-2 gap-y-5">
          <div>
            <h1 className="font-semibold">Fabric</h1>
            <p className="text-muted-foreground">{"Cotton"}</p>
          </div>
          <div>
            <h1 className="font-semibold">Transparency</h1>
            <p className="text-muted-foreground">{"Opaque"}</p>
          </div>
          <div>
            <h1 className="font-semibold">Weave Pattern</h1>
            <p className="text-muted-foreground">{"Regular"}</p>
          </div>
          <div>
            <h1 className="font-semibold">Sustainable</h1>
            <p className="text-muted-foreground">{"Sustainable"}</p>
          </div>
          <div>
            <h1 className="font-semibold">Fit</h1>
            <p className="text-muted-foreground">{"Regular fit"}</p>
          </div>
        </div>
        <div className="mt-5">
          <h1 className="font-semibold">Description</h1>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
