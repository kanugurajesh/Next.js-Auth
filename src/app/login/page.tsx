"use client"

import React, { useState } from "react";
import Image from "next/image";

export default function SignupPage() {

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [showEye, setShowEye] = useState(false);

    const onSignup = async () => {
        
    }

    return (
        <div className="flex flex-col justify-center h-screen items-center">
            <div className="flex flex-col gap-3 justify-center items-center">
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
                onClick={onSignup}>Login</button>
                <a className="text-blue-500 border-b-2 border-transparent hover:border-b-2 hover:border-blue-500 py-1" href="/signup">click here to register</a>
            </div>
        </div>
    )
}