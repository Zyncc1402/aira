"use client";

import { createUser } from "@/actions/signup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { signUpFormSchema } from "@/lib/zodSchemas";
import Link from "next/link";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";

type error = {
  path: string | number;
  message: string;
}[];

export default function SignUpFormComponent({
  callbackUrl,
}: {
  callbackUrl: string | string[] | undefined;
}) {
  const [errors, setErrors] = useState<error>([]);
  const { toast } = useToast();
  const { pending } = useFormStatus();

  async function handleSubmit(formData: FormData) {
    setErrors([]);
    const formdata = Object.fromEntries(formData);
    const { success, data, error } = signUpFormSchema.safeParse(formdata);
    if (error) {
      setErrors(
        error.issues.map((err: any) => ({
          path: err.path[0],
          message: err.message,
        }))
      );
    }
    if (success) {
      const res = await createUser(data, callbackUrl);
      console.log(res);
      if (res == "Account exists, Try using Social login") {
        toast({
          title: "Account already exists",
          description: "Try using Social login",
        });
      }
      if (res == "Account already exists") {
        toast({
          title: res,
          description: "Login instead",
          action: (
            <ToastAction altText="Login in">
              <Link href={"/signin"}>Login in</Link>
            </ToastAction>
          ),
        });
      }
    }
  }
  return (
    <form
      className="mt-8 space-y-4"
      action={(formData) => handleSubmit(formData)}
    >
      <div className="space-y-1">
        <Label htmlFor="name" className="text-gray-700">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Alan wake"
          className="text-black"
        />
        {errors.find((error) => error.path == "name") && (
          <h1 className="text-red-500 font-medium text-sm">
            {errors.find((error) => error.path == "name")?.message}
          </h1>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="email" className="text-gray-700">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          placeholder="alan@example.com"
          className="text-black"
        />
        {errors.find((error) => error.path == "email") && (
          <h1 className="text-red-500 font-medium text-sm">
            {errors.find((error) => error.path == "email")?.message}
          </h1>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="phone" className="text-gray-700">
          Phone
        </Label>
        <Input
          id="phone"
          name="phone"
          type="number"
          placeholder="Enter your phone number"
          className="text-black"
        />
        {errors.find((error) => error.path == "phone") && (
          <h1 className="text-red-500 font-medium text-sm">
            {errors.find((error) => error.path == "phone")?.message}
          </h1>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="password" className="text-gray-700">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="●●●●●●●●"
          className="text-black"
        />
        {errors.find((error) => error.path == "password") && (
          <h1 className="text-red-500 font-medium text-sm">
            {errors.find((error) => error.path == "password")?.message}
          </h1>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-blue-600 text-white hover:bg-blue-700"
        disabled={pending}
      >
        {pending ? "Creating Account" : "Create Account"}
      </Button>
    </form>
  );
}
