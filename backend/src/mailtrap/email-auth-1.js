import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates-auth-1-.js"
import { mailTrapClient, sender } from "./mailtrap-auth-1.js"

export const sendVerificationEmail = async (email, verificationToken) =>{
    const recipient = [{email}]

    try {
        const respones = await mailTrapClient.send({
           from: sender,
           to: recipient,
           subject: "Verify your email",
           html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
           category: "Email Verification"
        })
    } catch (error) {
        throw new Error(`Error sending verification email: ${error}`)
    }
}

export const sendWelcomeEmail = async(email, name) => {
    const recipient =[{email}];

    try {
       const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "a3ca0fa7-0a92-48a4-a17b-6270e18e7b72",
            template_variables: {
                "name": name
            }
        });

    } catch (error) {
        throw new Error(`Error sending welcome email: ${error}`)
    }
}

export const sendPasswordResetEmail = async(email, resetURL) => {
    const recipient = [{email}];
    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        })
    } catch (error) {
        throw new Error(`Error sending password reset email: ${error}`);
    }
}

export const sendResetSuccessEmail = async(email) => {
    const recipient = [{email}]
    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        });
    } catch (error) {
        throw new Error(`Error sending password reset success email: ${error}`);
    }
}