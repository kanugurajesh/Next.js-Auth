"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

export default function VerifyEmailPage() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");

    const [token, setToken] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const verifyForgetEmail = async () => {
        try {
            // sending a request to the verify-email api endpoint to verify the user
            const response = await fetch(`/api/users/verifyforgetemail/${token}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            const data = await response.json();

            if (data.success) {
                setVerified(true)
            }

        } catch (error:any) {
            setError(true)
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        // taking the current url and splitting the url into two halves at = and taking the second value
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken);
    }, [])

    useEffect(() => {
        if(token) {
            if(token.length > 0) {
                verifyForgetEmail();
            }
        }
    }, [token])

    return (
        <div className="flex flex-col justify-center h-screen items-center">
            <div className="flex flex-col gap-3 justify-center items-center">
                <Toaster />
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
            </div>
        </div>
    )
}