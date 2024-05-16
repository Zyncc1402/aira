import Spinner from "@/components/loadingSpinner";
import React from "react";

const Loading = () => {
  return (
    <div className="pt-[100px]">
      <div className="flex justify-between container">
        <h1 className="font-semibold text-3xl">Your Orders</h1>
      </div>
      <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
        <Spinner size={60} />
      </div>
    </div>
  );
};

export default Loading;
