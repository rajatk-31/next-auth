import { resend } from "@/lib/resend";
import VerificationEmail from "../../email/verification";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(payload: {
  email: string;
  username: string;
  verifyCode: string;
}): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Rajat <no-reply@aawaramusafir.com>",
      to: [payload.email],
      subject: "Next Verification Mail",
      react: VerificationEmail({
        username: payload.username,
        otp: payload.verifyCode,
      }),
    });

    return {
      success: true,
      message: "Verification email sent successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error?.message || "Something went wrong. Please try again later.",
    };
  }
}
