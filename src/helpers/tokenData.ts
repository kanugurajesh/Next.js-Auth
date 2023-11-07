import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET || '');
        return decodedToken.user_id || null;
    } catch (error:any) {
        throw new Error(error.message);
    }
}