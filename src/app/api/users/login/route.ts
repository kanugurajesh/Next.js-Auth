import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

// connecting to database
connect();

export async function POST(request: NextRequest) {
    
    try {
        // get data from request body
        const reqBody = await request.json();
        const { email, password } = reqBody;
        const user = await User.findOne({email});

        // check if user exists
        if(!user) {
            return NextResponse.json({error: "User does not exist", success:false},{status: 400});
        }

        // check password
        const isMatch = await bcryptjs.compare(password,user.password)
        
        // comparing the hashed password in the database to the user entered password
        if(!isMatch) {
            return NextResponse.json({error: "Invalid credentials",success:false},{status: 400});
        }

        // check if user is verified
        if(!user.isVerified) {
            return NextResponse.json({error: "Please verify your email",success:false},{status: 400});
        }

        // creating token Data
        const tokenData = {
            user_id: user._id,
            username: user.username,
            email: user.email
        }

        // create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!, {expiresIn: "1h"});

        // creating response
        const response = NextResponse.json({
            message: "Login successful",
            success: true
        })

        // set cookie
        response.cookies.set("token", token, {
            httpOnly: true
        })
        // return response
        return response;
    } catch (error:any) {
        // return error
        return NextResponse.json({error: error.message},{status:500})
    }
}