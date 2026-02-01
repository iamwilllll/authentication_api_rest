import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

type SendEmailServiceProps = {
    to: string;
    subject: string;
    text: string;
    html: string;
};

const { HOST, PORT, SECURE, USER, PASSWORD } = env.SMTP;

const configOptions = {
    host: HOST,
    port: PORT,
    secure: SECURE,
    auth: {
        user: USER,
        pass: PASSWORD,
    },
};

export async function sendEmailService({ to, subject, text, html }: SendEmailServiceProps) {
    const transporter = nodemailer.createTransport(configOptions);
    await transporter.verify();

    const info = await transporter.sendMail({ from: 'E-commerce', to, subject, text, html });
    return info;
}
