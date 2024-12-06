import { Resend } from "resend";
import type { APIRoute } from "astro";

const fromEmail = import.meta.env.RESEND_FROM_EMAIL;
const resendToken = import.meta.env.RESEND_API_KEY;

const resend = new Resend(resendToken);

type ResponseOutput = {
  data?: any;
  message: string;
  status: 200 | 400 | 401 | 500;
};

const responseOutput = ({ message, data, status }: ResponseOutput) => {
  const allowDomain =
    import.meta.env.MODE === "development"
      ? "*"
      : "https://secretsantasolver.com";

  return new Response(
    JSON.stringify({
      message,
      data,
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowDomain,
      },
    }
  );
};

async function sendSecretSantaEmail(
  participant: string,
  assignedTo: string
): Promise<void> {
  try {
    await resend.emails.send({
      from: fromEmail,
      to: participant,
      subject: "🎅 Ho Ho Ho! Your Secret Santa Assignment!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #FFF; padding: 20px; border-radius: 8px; border: 2px solid #215B33;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #D62828; font-size: 28px; margin: 0;">🎄 Secret Santa Assignment 🎄</h1>
          </div>

          <p style="color: #215B33; font-size: 18px;">Dear ${participant},</p>

          <p style="color: #2D3748;">The magic of Christmas has worked its wonder! 🎉</p>

          <div style="background-color: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #E2E8F0;">
            <p style="font-size: 18px; text-align: center; margin: 0; color: #2D3748;">
              You are the Secret Santa for:
              <strong style="color: #D62828; display: block; font-size: 24px; margin-top: 10px;">
                ${assignedTo} 🎁
              </strong>
            </p>
          </div>

          <div style="background-color: #215B33; color: #FFF; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; text-align: center;">Remember to keep it a secret! 🤫</p>
          </div>

          <p style="color: #2D3748; text-align: center;">Wishing you a magical Christmas filled with joy and surprises! 🌟</p>

          <div style="text-align: center; margin-top: 20px; color: #D62828; font-size: 24px;">
            🎅 Ho Ho Ho! 🎄
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send Secret Santa email");
  }
}

export const POST: APIRoute = async ({ request }) => {
  // Get the form data from the request
  const participant = await request.json();
  const name = participant.name;
  const email = participant.email;

  // Validate the data
  if (!email || !name) {
    return responseOutput({
      status: 400,
      message: "Email and name are required.",
    });
  }

  // Send the email
  await sendSecretSantaEmail(name, email);

  // Return a success response
  return responseOutput({
    status: 200,
    message: "Success. Email sent.",
  });
};
