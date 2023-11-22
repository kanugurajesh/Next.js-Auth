import { NextResponse } from "next/server";

// Create a default get rotue the logs the user out
export async function GET() {
    try {
        // Creating a response with a message and a success status
        const response = NextResponse.json(
            {
                message: 'Logout successfull',
                success: true
            }
        )
        // Setting the token cookie to be empty and expired
        response.cookies.set("token","",{
            httpOnly: true,
            expires: new Date(0),
        })
        // Returning the response
        return response;
    } catch (error:any) {
        // If there is an error, return a 500 error with the error messages
        return NextResponse.json({ error: error.message}, {status: 500})
    }
}