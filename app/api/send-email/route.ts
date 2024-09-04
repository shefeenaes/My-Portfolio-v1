import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
    SES: new AWS.SES({
        apiVersion: '2010-12-01',
    }),
});

// Named export for POST method
export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json();

        const mailOptions = {
            from: 'shefeena.e.s@gmail.com',
            to: 'shefeena.e.s@gmail.com',
            subject: `New Contact Form Submission from ${name}`,
            text: `You have a new message from your portfolio contact form.\n\n
                Name: ${name}\n
                Email: ${email}\n
                Message: ${message}`,
        };

        // Send the email via SES
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Error sending email', error: (error as Error).message }, { status: 500 });
    }
}
