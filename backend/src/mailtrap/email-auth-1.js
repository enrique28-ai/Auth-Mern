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

export const sendWelcomeEmail = async (email, name = "") => {
  const recipient = [{ email }];
  try {
    const uuid = process.env.MAILTRAP_WELCOME_TEMPLATE_UUID;

    const payload = uuid
      ? {
          from: sender,
          to: recipient,
          template_uuid: uuid,
          template_variables: { name },
        }
      : {
          from: sender,
          to: recipient,
          subject: "Welcome!",
          category: "Welcome",
          html: `<p>Welcome, <b>${name || "there"}</b> 🎉</p>`,
        };

    await mailTrapClient.send(payload);
  } catch (e) {
    // re-lanza con más contexto (lo capturamos más arriba o en logs)
    const msg =
      e?.response?.body || e?.response?.data || e?.message || String(e);
    throw new Error(`Error sending welcome email: ${msg}`);
  }
};

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