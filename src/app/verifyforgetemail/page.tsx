"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast, {Toaster} from 'react-hot-toast';

export default function VerifyEmailPage() {

    const router = useRouter();

    const [token, setToken] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [showEye, setShowEye] = useState<boolean>(false);
    const [showEye2, setShowEye2] = useState<boolean>(false);

    useEffect(() => {
        if(password && password2) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    },[password,password2])

    const verifyUserEmail = async () => {

        try {
            // send a post request to the verify-email api endpoint to verify the user
            const response = await fetch(`/api/users/verifyforgetemail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                    password: password
                })
            });
          
            const data = await response.json();

            if (data.success) {
                toast.success(data.message);
                router.push("/login");
            } else {
                toast.error(data.message);
            }
            
        } catch (error:any) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        // if urlToken does not exist
        if (!urlToken) {
            toast.error("Invalid token");
            router.push("/login")
        } else {
            setToken(urlToken);
        }
    }, [])

    useEffect(() => {
        if (token?.length > 0) {
            verifyUserEmail();
        }
    }, [token])

    return (
        <div className="flex flex-col justify-center h-screen items-center">
            <div className="flex flex-col gap-3 justify-center items-center">
                <Toaster />
                <h1 className="text-2xl font-bold">Enter your password</h1>
                <label htmlFor="password"></label>
                <div className="relative">
                    <input 
                        type={showEye ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="password"
                        className="h-10 w-60 border-2 border-black rounded-md px-3"
                        />
                        <Image src={showEye ? "/view.png" : "/hide.png"} alt="" width={23} height={23} className="absolute right-3 top-2" onClick={()=>setShowEye(!showEye)}/>
                </div>
                <label htmlFor="password"></label>
                <div className="relative">
                    <input 
                        type={showEye ? "text" : "password"}
                        id="password"
                        value={password2}
                        onChange={(e)=>setPassword2(e.target.value)}
                        placeholder="password"
                        className="h-10 w-60 border-2 border-black rounded-md px-3"
                        />
                        <Image src={showEye2 ? "/view.png" : "/hide.png"} alt="" width={23} height={23} className="absolute right-3 top-2" onClick={()=>setShowEye2(!showEye2)}/>
                </div>
                <button className="h-10 w-40 border-2 border-black rounded-md bg-blue-500 hover:bg-blue-700 my-4 font-bold"
                onClick={verifyUserEmail}>{buttonDisabled ? "Fill details" : "Reset Password"}</button>
            </div>
        </div>
    )
}