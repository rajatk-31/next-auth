import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
});

export interface User extends Document {
  username: string;
  name: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isAcceptingMessages: boolean;
  isVerified: boolean;
  createdAt: Date;
  messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "User Name is required"],
    trim: true,
    unique: true,
  },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please use a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
      "Password must be between 6 and 20 characters long and contain at least one numeric digit, one uppercase and one lowercase letter",
    ],
  },
  verifyCode: { type: String, required: true },
  verifyCodeExpiry: { type: Date, required: true },
  isAcceptingMessages: { type: Boolean, default: true, required: true },
  isVerified: { type: Boolean, default: false, required: true },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now, required: true },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
