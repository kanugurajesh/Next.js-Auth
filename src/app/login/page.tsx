"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

// creating a user interface
interface User {
    email : string,
    password : string
}

export default function SignupPage() {

    // using the router hook
    const router = useRouter();

    // creating a user state
    const [user, setUser] = useState<User>({
        email: "",
        password: ""
    })

    // creating a button disabled state
    const [buttonDisabled, setButtonDisabled] = useState(false);

    // creating a loading state
    const [loading, setLoading] = useState(false);

    // creating a show eye state
    const [showEye, setShowEye] = useState(false);

    // creating a on login function
    const onLogin = async () => {
        try {
            setLoading(true);
            // making a post request to the server
            const response = await fetch("/api/users/login/",{
                "method": "POST",
                "headers" : {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(user)
            })
            
            // getting the data from the response
            const data = await response.json();
            // checking if the user is logged in or not
            if(data.success) {
                toast.success("Logged in successfully");
                setTimeout(() => {
                    router.push("/profile");
                }, 900);
            } else {
                toast.error(data.error);
            }
            setLoading(false);
        } catch (error:any) {
            toast.error(error.error)
        }
    }

    // using the use effect hook
    useEffect(() => {
        if(user.email && user.password) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col justify-center h-screen items-center">
            <div className="flex flex-col gap-3 justify-center items-center">
                <Toaster />
                <h1 className="text-2xl font-bold">Login</h1>
                <label htmlFor="email"></label>
                <input 
                    type="email"
                    id="email"
                    value={user.email}
                    onChange={(e)=>setUser({...user,email:e.target.value})}
                    placeholder="email"
                    className="h-10 w-60 border-2 border-black rounded-md px-3"
                    />
                <label htmlFor="password"></label>
                <div className="relative">
                    <input 
                        type={showEye ? "text" : "password"}
                        id="password"
                        value={user.password}
                        onChange={(e)=>setUser({...user,password:e.target.value})}
                        placeholder="password"
                        className="h-10 w-60 border-2 border-black rounded-md px-3"
                        />
                        <Image src={showEye ? "/view.png" : "/hide.png"} alt="" width={23} height={23} className="absolute right-3 top-2" onClick={()=>setShowEye(!showEye)}/>
                </div>
                <button className="h-10 w-40 border-2 border-black rounded-md bg-blue-500 hover:bg-blue-700 my-4 font-bold"
                onClick={onLogin}>Login</button>
                <div className="flex gap-5">
                    <a className="text-blue-500 border-b-2 border-transparent hover:border-b-2 hover:border-blue-500 py-1 font-medium" href="/forgetpassword">forget password</a>
                    <a className="text-blue-500 border-b-2 border-transparent hover:border-b-2 hover:border-blue-500 py-1 font-medium" href="/signup">register now</a>
                </div>
            </div>
        </div>
    )
}