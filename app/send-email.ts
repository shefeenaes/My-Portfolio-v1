import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer, { SentMessageInfo } from 'nodemailer';
import AWS from 'aws-sdk';
console.log('reached in api')
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body as { name: string; email: string; message: string; };

        try {
            const mailOptions = {
                from: 'shefeena.e.s@gmail.com', // Replace with your verified SES email
                to: 'shefeena.e.s@gmail.com', // Replace with the email where you want to receive the form data
                subject: `New Contact Form Submission from ${name}`,
                text: `You have a new message from your portfolio contact form.\n\n
                    Name: ${name}\n
                    Email: ${email}\n
                    Message: ${message}`,
            };

            // Send the email via SES
            const info: SentMessageInfo = await transporter.sendMail(mailOptions);

            res.status(200).json({ message: 'Email sent successfully', info });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ 
                message: 'Error sending email', 
                error: (error instanceof Error) ? error.message : 'Unknown error occurred' 
            });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
