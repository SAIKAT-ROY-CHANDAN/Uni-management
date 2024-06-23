/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
    id: string;
    email: string;
    password: string;
    needsPasswordChange: boolean;
    passwordChangedAt?: Date;
    role: 'super-admin' | "student" | "faculty" | "admin";
    status: 'in-progress' | 'blocked'
    isDeleted: boolean;
}
export type TUserRole = keyof typeof USER_ROLE;

export interface UserModel extends Model<TUser> {
    isUserExistsByCustomId(id: string): Promise<TUser>
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>
    isJWTIssuedBeforePasswordChanged(
        passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number
    ): boolean
}