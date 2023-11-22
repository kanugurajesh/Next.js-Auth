import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request:NextRequest) {

    try {
        const reqBody = await request.json();
        const { email } = reqBody;
        const user = await User.findOne({email:email})

        if(!user) {
            return NextResponse.json({error:"User does not exist", success:false},{status:400});
        }

        await sendEmail({email,emailType:"RESET",userId:user._id})

        // returning a response
        return NextResponse.json({
            message: "Email sent successfully",
            success: true
        })
        
    } catch(error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }

}