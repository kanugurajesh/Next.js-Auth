import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {

    try {
        
        // parsing the request body into json
        const reqBody = await request.json();
        // getting the token from the request body
        const { token } = reqBody;

        // if no token is found in the request body return status 400 with a message
        if(!token) return NextResponse.json({error: 'No token found'},{status: 400});
        // find the user with the token and the token expiry is greater than the current time
        const user = await User.findOne({verifyToken: token,verifyTokenExpiry: {$gt: Date.now()}})
        // if no user is found return status 400 with a message
        if (!user) return NextResponse.json({error: 'Invalid token'},{status: 400});

        // update the user with the token and the token expiry is greater than the current time
        await User.updateOne({verifyToken: token,verifyTokenExpiry: {$gt: Date.now()}},{$set: {isVerified: true,verifyToken: undefined,verifyTokenExpiry: undefined}})

        return NextResponse.json({
                message: "Email verified successfully",
                success: true
            })
    } catch (error:any) {
        // if any error occurs return status 500 with a message
        return NextResponse.json({error: error.message},{status: 500})
    }
}