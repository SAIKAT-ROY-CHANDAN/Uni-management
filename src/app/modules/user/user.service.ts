import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academic.model";

import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utlis";
import mongoose from "mongoose";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);

  userData.role = 'student';

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    if (!admissionSemester) {
      throw new AppError(httpStatus.NOT_FOUND, "Admission Semester Not found!")
    }

    userData.id = await generateStudentId(admissionSemester);
    // transaction 1 because we are writing in DB
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User!')
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    // transaction 2 because we are also making changes in DB
    const newStudent = await Student.create([payload], { session });

    if(!newStudent){
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    await session.commitTransaction()
    await session.endSession()

    return newStudent;


  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
  }

};

export const UserServices = {
  createStudentIntoDB,
}