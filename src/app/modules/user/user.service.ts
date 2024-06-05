/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academic.model";

import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateFacultyId, generateStudentId } from "./user.utlis";
import mongoose from "mongoose";
import { TFaculty } from "../faculty/faculty.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../faculty/faculty.model";

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


  } catch (error:any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error)
    // throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
  }

};

const createFacultyIntoDb = async(password: string, payload: TFaculty) => {
      const userData:Partial<TUser> = {};
      userData.password = password || (config.default_password as string)

      userData.role = 'faculty';

      const academicDepartment = await AcademicDepartment.findById(
        payload.academicDepartment,
      );

      if(!academicDepartment){
        throw new AppError(400, 'Academic department not found');
      }

      const session = await mongoose.startSession();

      try {
        session.startTransaction();

        userData.id = await generateFacultyId();

        const newUser = await User.create([userData], {session})

        if(!newUser.length){
          throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }

        payload.id = newUser[0].id
        payload.user = newUser[0]._id;


        const newFaculty = await Faculty.create([payload], { session });

        if (!newFaculty.length) {
          throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
        }
    
        await session.commitTransaction();
        await session.endSession();
    
        return newFaculty;

      } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
      }
}

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDb
}