"use client"

import React, { useState, useEffect } from 'react';

export default function VerifyEmailPage() {

    const [token, setToken] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const verifyUserEmail = async () => {
        try {
            
        } catch (error:any) {
            setError(true)
        }
    }

}