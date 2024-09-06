"use client"

import Link from "next/link";
import AddressForm from "@/app/(client)/checkout/components/addressForm";
import React, {useState} from "react";
import {UserWithAddress} from "@/lib/types";
import {useAddress} from "@/context/address";
import {Button} from "@/components/ui/button";

export default function CheckoutBlock({getAddresses} : {getAddresses: UserWithAddress | null}) {
    const {selectedAddress, setAddress} = useAddress();
    const [showAddress, setShowAddress] = useState(false);
    return (
        <div className={'flex-1'}>
            {getAddresses?.address != undefined && getAddresses.address.length > 0 && (<h1 className={'font-medium text-xl'}>Select an Address</h1>)}
            {getAddresses?.address.map(address => (
                <div key={address.id} className={`my-4 border-2 rounded-lg p-3 w-full cursor-pointer ${selectedAddress == address.id ? 'border-[#fbd8b4] bg-[#fcf5ee]' : 'border-muted bg-white'}`} onClick={() => setAddress(address.id)}>
                    <h1 className={'font-medium line-clamp-1'}>{address.name}</h1>
                    <h1 className={'line-clamp-1'}>{address.address1}</h1>
                    <h1 className={'line-clamp-1'}>{address.phone}</h1>
                </div>
            ))}
            {getAddresses?.address != undefined  && getAddresses.address.length > 0 && (
                <Button variant={'link'} size={'sm'} onClick={() => setShowAddress(true)}>Add new Address</Button>
            )}
            {(showAddress || getAddresses?.address.length == 0) && (<>
                <h1 className={'font-medium text-xl mt-5'}>Add new Address</h1>
                <AddressForm/>
            </>)}
        </div>
    )
}