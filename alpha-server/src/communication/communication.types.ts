export interface EmailOptions {
    to: string;
    subject: string;
    body: string;
    type: "text" | "html";
    template?: "welcome" | "passwordReset" | "notification" | "otp";
}