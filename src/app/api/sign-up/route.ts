import dbConnect from "@/lib/dbConnect";
import UserModal from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await req.json();
    const verifiedUserByUserName = await UserModal.findOne({
      username,
      isVerified: true,
    });
    if (verifiedUserByUserName) {
      return Response.json(
        {
          success: false,
          message: "User already exists",
        },
        {
          status: 400,
        },
      );
    }

    const existingUserByEmail = await UserModal.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists",
          },
          {
            status: 400,
          },
        );
      } else {
        const salt = await bcrypt.genSalt(10);
        existingUserByEmail.password = await bcrypt.hash(password, salt);
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 600000);
        await existingUserByEmail.save();
      }
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new UserModal({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: new Date(Date.now() + 600000),
        isVerified: false,
        isAcceptingMessages: true,
      });
      await user.save();
    }

    const emailResponse = await sendVerificationEmail({
      email,
      username,
      verifyCode,
    });
    if (emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        {
          status: 500,
        },
      );
    }
    return Response.json({
      success: true,
      message:
        "User registered successfully. Please check your email for verification code.",
    });
  } catch (e) {
    console.log("Error in registering user", e);
    return Response.json(
      {
        success: false,
        message: "Error in registering user",
      },
      {
        status: 500,
      },
    );
  }
}
