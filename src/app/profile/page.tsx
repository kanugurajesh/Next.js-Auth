"use client"

import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

export default function Profile() {

    const logout = async () => {
        try {

            const response = await fetch("/api/users/logout", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.removeItem("token");
                window.location.href = "/";
            } else {
                toast.error(data.message);
            }            
        } catch (error) {
            
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <hr />
            <button
            onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >LogOut</button>
        </div>
    )
}