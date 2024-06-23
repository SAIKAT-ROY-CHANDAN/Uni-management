import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from '../../config';
import bcrypt from 'bcrypt';

export const userSchema = new Schema<TUser, UserModel>({
  id: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: 0,
  },
  needsPasswordChange: { type: Boolean, default: true },
  passwordChangedAt: { type: Date },
  role: {
    type: String,
    enum: [
      "superAdmin",
      "student",
      "faculty",
      "admin"
    ]
  },
  status: {
    type: String,
    enum: ["in-progress", "blocked"],
    default: "in-progress"
  },
  isDeleted: { type: Boolean, default: false },

}, { timestamps: true })

userSchema.pre('save', async function (next) {

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware / hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password')
}

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;

  return passwordChangedTime > jwtIssuedTimestamp
}

userSchema.statics.isPasswordMatched = async function name(plainTextPassword, hashedPassword) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

export const User = model<TUser, UserModel>("User", userSchema)