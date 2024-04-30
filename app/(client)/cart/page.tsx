import Image from "next/image";
import React from "react";

const Cart = async () => {
  return (
    <div className="flex justify-between h-screen w-screen container">
      {
        <div className="flex flex-col items-center justify-center w-screen h-[100%]">
          <Image
            src={"/empty-cart.png"}
            height={500}
            width={500}
            alt="empty cart"
            className="noSelectImage"
            priority={true}
          />
          <h1 className="font-medium">No items in cart</h1>
        </div>
      }
    </div>
  );
};

export default Cart;
