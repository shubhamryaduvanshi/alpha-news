import { Injectable } from "@nestjs/common";
import * as nodeMailer from "nodemailer";
import { EmailOptions } from "./communication.types";
@Injectable()
export class CommunicationService {
    constructor() { }

    private async transporter() {
    
        console.log(process.env.SMTP_EMAIL, process.env.SMTP_PASSWORD);
        
        const transport = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_EMAIL ?? '',
                pass: process.env.SMTP_PASSWORD,
            },
        });
        return transport;
    }


    async sendEmail({ to, subject, body, type, template, }: EmailOptions) {
        try {
            const transporter = await this.transporter();
            const info = await transporter.sendMail({
                from: `"Alpha Portal" <${process.env.SMTP_EMAIL}>`,
                to: to,
                subject: subject,
                text: body,
                html: body,
            });

            console.log("Message sent: %s", info.messageId);
            return {
                message: 'Email send successfully!'
            }
        } catch (error) {
            throw new Error("Unable to send email!", error)
        }

    }
}