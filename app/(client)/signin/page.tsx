import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {FcGoogle} from "react-icons/fc";
import Link from "next/link";
import React from "react";
import {signIn} from "@/auth";
import {redirect} from "next/navigation";
import getSession from "@/lib/getSession";
import {FaFacebook} from "react-icons/fa";

export default async function Page({searchParams}: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const session = await getSession();
    if (session?.user) {
        redirect("/");
    }
    const callbackUrl = searchParams.callbackUrl
    return (
        <section className="container flex items-center justify-center h-screen">
            <div className="p-4 rounded-lg">
                <h1 className="text-xl font-medium">Sign in to your Account</h1>
                <form
                    action={async (formData) => {
                        "use server";
                        const email = formData.get("email");
                        const password = formData.get("password");
                        await signIn("credentials", {
                            email,
                            password,
                            redirectTo: callbackUrl as string
                        });
                    }}
                    className="flex flex-col gap-y-4 mt-5"
                >
                    <div>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder="Enter your Email"
                            required
                            name="email"
                        />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            placeholder="Enter your Password"
                            required
                            name="password"
                            autoComplete="off"
                        />
                    </div>
                    <Button className="w-full">Sign in</Button>
                </form>
                <h1 className="text-center my-5">Or with</h1>
                <form
                    action={async () => {
                        "use server";
                        await signIn("facebook", {
                            redirectTo: `${callbackUrl}`
                        });
                    }}
                >
                    <button
                        type="submit"
                        className="bg-blue-500 text-white w-full mb-5 h-10 px-4 py-2 rounded-md font-medium flex items-center justify-center"
                    >
                        <FaFacebook className="mr-5" size={25}/>
                        Sign in with Facebook
                    </button>
                </form>
                <form
                    action={async () => {
                        "use server";
                        await signIn("google", {
                            redirectTo: `${callbackUrl}`
                        });
                    }}
                >
                    <button
                        type="submit"
                        className="bg-white text-black w-full mb-5 h-10 px-4 py-2 rounded-md font-medium flex items-center justify-center border-2 border-gray-800"
                    >
                        <FcGoogle className="mr-5" size={25}/>
                        Sign in with Google
                    </button>
                </form>
                <h1>
                    Don't have an Account?{" "}
                    <Link href={`/signup?callbackUrl=${callbackUrl}`} className="underline">
                        Sign up
                    </Link>
                </h1>
            </div>
        </section>
    );
}
