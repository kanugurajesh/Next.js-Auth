import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = (request: NextRequest) => {
    try {
        // get the token from the cookies
        const token = request.cookies.get('token')?.value || '';
        // if no token is found return null
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET || '');
        // return the user id
        return decodedToken.user_id || null;
    } catch (error:any) {
        // if any error occurs throw the error
        throw new Error(error.message);
    }
}