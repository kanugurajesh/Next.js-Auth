import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        // parsing the request body into json
        const reqBody = await request.json();

        // getting the token from the request body
        const { token, password } = reqBody;

        // if no token is found in the request body return status 400 with a message
        if(!token) return NextResponse.json({error: 'No token found'},{status: 400});

        // if no password is found in the request body return status 400 with a message
        if(!password) return NextResponse.json({error: 'No password found'},{status: 400});

        // find the user with the token and the token expiry is greater than the current time
        const user:any = User.findOne({forgotPasswordToken: token,forgotPasswordTokenExpiry: {$gt: Date.now()}})

        // if no user is found return status 400 with a message
        if (!user) return NextResponse.json({error: 'Invalid token'},{status: 400});

        // salting and hashing the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt)

        // update the user password and remove the token and token expiry
        await User.updateOne({forgotPasswordToken: token,forgotPasswordTokenExpiry: {$gt: Date.now()}},{$set: {password: hashedPassword,forgotPasswordToken: undefined,forgotPasswordTokenExpiry: undefined,isVerified: true}})

        // return status 200 with a message
        return NextResponse.json({
                message: "Password reset successfully",
                success: true
            })
            
    } catch (error:any) {
        // if any error occurs return status 500 with a message
        return NextResponse.json({error: error.message},{status: 500})
    }
}