import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from '../../config';
import bcrypt from 'bcrypt';

export const userSchema = new Schema<TUser, UserModel>({
  id: { type: String, required: true },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: [20, 'Password can not be more than 20 characters'],
  },
  needsPasswordChange: { type: Boolean, default: true },
  role: { type: String, enum: ["student", "faculty", "admin"] },
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
  return await User.findOne({ id })
}

userSchema.statics.isPasswordMatched = async function name(plainTextPassword, hashedPassword) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

export const User = model<TUser, UserModel>("User", userSchema)