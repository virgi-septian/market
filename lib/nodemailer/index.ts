import nodemailer from 'nodemailer';
import { WELCOME_EMAIL_TEMPLATE } from './templates';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    },
})

export const sendWelcomeEmail = async (email: string, name: string, intro: string) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace('{{name}}', name).replace('{{intro}}', intro);

    const mailOptions = {
        from: `"Signalist" <virgiseptiannn@gmail.com>`,
        to: email,
        subject: 'Welcome to Signalist',
        text: 'Thank for joining lisa',
        html: htmlTemplate,
    }

    await transporter.sendMail(mailOptions);
}