"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

// creating a user interface
interface User {
    username: string;
    email: string;
    password: string;
}

export default function SignupPage() {

    const router = useRouter();

    const [user, setUser] = useState<User>({
        username: "",
        email: "",
        password: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [showEye, setShowEye] = useState(false);

    const onSignup = async () => {

        try {
            // send the data to the server
            const response = await fetch("/api/users/signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            
            const data = await response.json();

            if(data.success) {
                // give the success message using toast
                toast.success(data.message);
                // redirect to login page
                setTimeout(() => {
                    router.push("/login");
                }, 900);
            } else {
                // give the error message using toast
                toast.error(data.error);
            }
        } catch (error:any) {
            toast.error(error.message)
        }
    }
    
    useEffect(() => {
        if(user.email && user.password && user.username) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    },[user])


    return (
        <div className="flex flex-col justify-center h-screen items-center">
            <div className="flex flex-col gap-3 justify-center items-center">
                <Toaster />
                <h1 className="text-2xl font-bold">Register your account</h1>
                <label htmlFor="username"></label>
                <input
                    type="text"
                    id="username" 
                    value={user.username}
                    onChange={(e) => setUser({...user,username: e.target.value})}
                    placeholder="username"
                    className="h-10 w-60 border-2 border-black rounded-md px-3"
                    />
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
                onClick={onSignup}>{buttonDisabled ? "Fill details" : "Sign Up"}</button>
                <a className="text-blue-500 border-b-2 border-transparent hover:border-b-2 hover:border-blue-500 py-1" href="/login">click here to login</a>
            </div>
        </div>
    )
}