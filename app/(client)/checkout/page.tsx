import React from "react";
import prisma from "@/lib/prisma";
import getSession from "@/lib/getSession";
import {toast} from "@/components/ui/use-toast";
import {updateUserAddress} from "@/actions/formSubmissions";
import CheckoutBlock from "@/app/(client)/checkout/components/checkoutBlock";
import PriceSummary from "@/app/(client)/checkout/components/priceSummary";

export default async function Page() {
    const session = await getSession()
    const getAddresses = await prisma.user.findUnique({
        where: {
            id: session?.user.id
        },
        include: {
            address: true
        }
    })
    const handleAddressSubmit = (formData: FormData) => {
        const zipcode = formData.get("zipcode");
        const phone = formData.get("phone");
        const zipCoderegex = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
        const phoneRegex = /^[6-9]\d{9}$/;
        const validZipcode = zipCoderegex.test(zipcode as string);
        const validPhone = phoneRegex.test(phone as string);
        if (!validZipcode) {
            toast({
                variant: "destructive",
                title: "Invalid Zip Code",
            });
        } else if (!validPhone) {
            toast({
                variant: "destructive",
                title: "Invalid Phone Number",
            });
        } else {
            updateUserAddress(formData);
        }
    };
    return <section className="container my-10 gap-x-10 flex flex-col md:flex-row gap-y-[70px]">
        <CheckoutBlock getAddresses={getAddresses}/>
        <PriceSummary/>
    </section>;
}
