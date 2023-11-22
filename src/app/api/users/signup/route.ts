import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest) {
    
    try {
        // get data from request body
        const reqBody = await request.json();

        // destructure data from the request body
        const { username, email, password } = reqBody;

        // checking whether the specified email already exists in the database
        const user = await User.findOne({email})

        // if the user exists, return an error
        if(user) {
            return NextResponse.json({error: "User already exists", success:false},{status: 400});
        }

        // salting and hashing the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt)

        // creating a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        // saving the user to the database
        const savedUser = await newUser.save();

        // send verification email to the user
        await sendEmail({email,emailType: "VERIFY",userId: savedUser._id})

        // returning a response
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error:any) {
        // return error
        return NextResponse.json({error: error.message},{status:500})
    }
}