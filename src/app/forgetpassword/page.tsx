"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [emailStatus, setEmailStatus] = useState(true);

    return (
        <div className="flex flex-col justify-center h-screen items-center">
            <div className="flex flex-col gap-3 justify-center items-center">
                {!emailStatus ? (
                    <>
                        <h1 className="text-2xl font-bold">Enter your email</h1>
                        <label htmlFor="email"></label>
                        <input 
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder="email"
                            className="h-10 w-60 border-2 border-black rounded-md px-3"
                            />
                        <button className="h-10 w-40 border-2 border-black rounded-md bg-blue-500 hover:bg-blue-700 my-4 font-bold"
                        >verify email</button>
                    </>
                ) : (
                    <button className="h-10 w-60 border-2 border-black rounded-md bg-blue-500 hover:bg-blue-700 my-4 font-bold"
                    >verification email sent</button>
                )}
            </div>
        </div>
    )
}