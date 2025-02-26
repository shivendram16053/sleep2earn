import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, voucher, sleepAmount } = await req.json();

    const emailData = await resend.emails.send({
      from: "dev.purpose.mail1234@gmail.com",
      to: email,
      subject: "Your Voucher Redemption Confirmation",
      html: `
        <h1>Congratulations!</h1>
        <p>You have successfully redeemed <b>${sleepAmount} SLEEP</b> for a <b>${voucher}</b> voucher.</p>
        <p>Your voucher code will be sent soon.</p>
      `,
    });

    return NextResponse.json({ success: true, emailData });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
