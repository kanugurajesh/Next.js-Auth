"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function VerifyEmailPage() {

    const [token, setToken] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const verifyUserEmail = async () => {

        try {
            // send a post request to the verify-email api endpoint to verify the user
            const response = await fetch(`/api/users/verifyemail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token
                })
            });
          
            const data = await response.json();

            console.log(data);

            if (data.success) {
                setVerified(true)
            } else {
                setError(true)
            }
        } catch (error:any) {
            setError(true)
        }
    }

    useEffect(() => {
        // taking the current url and splitting the url into two halves at = and taking the second value
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken);
    }, [])

    useEffect(() => {
        if (token?.length > 0) {
            verifyUserEmail();
        }
    }, [token])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-4xl'>Verify Email</h1>
            <h2 className='p-2 bg-orange-500 text-black'>
                {token ? `${token}`:"no token"}
            </h2>
            {verified && (
                <div>
                    <h2 className='text-2xl'>Email Verified</h2>
                    <Link href="/login">Login</Link>
                </div>
            )}

            {error && (
                <div>
                    <h2 className='text-2xl'>Email not verified</h2>
                </div>
            )}
        </div>
    )
}