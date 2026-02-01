import { Resend } from 'resend';
import { env } from '../config/env.js';

type SendEmailServiceProps = {
    to: string;
    subject: string;
    html: string;
};

const resend = new Resend(env.RESEND.API_KEY);

export async function sendEmailService({ to, subject, html }: SendEmailServiceProps) {
    resend.emails.send({
        from: env.SMTP.USER,
        to: to,
        subject: subject,
        html: html,
    });
}
