"use client";

import React, {useRef} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/use-toast";
import {useSession} from "next-auth/react";
import {updateUserAddress} from "@/actions/formSubmissions";
import FormSubmitButton from "@/components/FormSubmitButton";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export default function AddressForm() {
  const { data: session } = useSession();
  const formRef = useRef<HTMLFormElement>(null)
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
      formRef?.current?.reset()
    }
  };
  return (
      <form
          ref={formRef}
          action={async (formData) => {
            handleAddressSubmit(formData)
          }}
          className="flex flex-col gap-4 w-full mt-3"
      >
        <input type="text" name="id" value={session?.user.id} hidden/>
        <Input
            placeholder="Name"
            name="name"
            type="text"
        />
        <Input
            placeholder="Email"
            name="email"
            type="text"
            required
        />
        <Input placeholder="Phone" name="phone" type="tel" required maxLength={10} minLength={10}/>
        <Input
            placeholder="Address line 1"
            name="address1"
            type="text"
            required
            minLength={30}
        />
        <Input
            placeholder="Address line 2"
            name="address2"
            type="text"
            required
            minLength={30}
        />
        <Select required name="state">
          <SelectTrigger>
            <SelectValue placeholder="Select a state"/>
          </SelectTrigger>
          <SelectContent>
            {states.map((state, i) => (
                <SelectItem value={state} key={i}>
                  {state}
                </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input placeholder="Zipcode" name="zipcode" type="text" required maxLength={6} minLength={6}/>
        <Input placeholder="Landmark" name="landmark" type="text" required/>
        <FormSubmitButton text="Add"/>
      </form>
  );
}
