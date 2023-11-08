import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

// creating an interface to set the types of the email options
interface EmailOptions {
    email: string;
    emailType: string;
    userId: string;
}

// creating a function to send the email
export const sendEmail = async ({email, emailType, userId}: EmailOptions) => {
    try {
        // creating a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        // checking the email type
        if (emailType === "VERIFY") {
            // updating the user with the verify token
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken,verifyExpiry: Date.now() + 3600000});
        } else if (emailType === "RESET") {
            // updating the user with the forgot password token
            await User.findByIdAndUpdate(userId,
            {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000});
        }

        // creating a transporter
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILTRAP_USER,
              pass: process.env.MAILTRAP_PASS
            }
          });

        // setting the mail options
        const mailOptions = {
            from: "darkhorse@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p> Click <a href="${process.env.DOMAIN+`/verifyemail?token=`+`${hashedToken}`}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
        }

        // sending the mail
        const mailresponse = await transport.sendMail(mailOptions);

        // returning the response
        return mailresponse;

    } catch (error: any) {
        // if any error occurs throw the error
        throw new Error(error.message);
    }
};