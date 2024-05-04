import { Button } from "@/components/ui/button";
import formatCurrency from "@/lib/formatCurrency";

type Props = {
  subtotal?: number;
};

function Checkout({ subtotal }: Props) {
  let formatted;
  if (subtotal) {
    formatted = formatCurrency(subtotal);
  }
  return (
    <div className="mt-10 pb-20 md:mt-0 md:mb-0">
      <h1 className="text-4xl font-semibold">Summary</h1>
      <h1 className="mt-3 mb-3 font-medium">Sub Total = {formatted}</h1>
      <Button className="w-full rounded-full font-bold">Checkout</Button>
    </div>
  );
}

export default Checkout;
