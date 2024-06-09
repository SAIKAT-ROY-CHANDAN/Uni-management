import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourse } from "./OfferedCourse.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../course/course.model";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
    const {
        semesterRegistration,
        academicFaculty,
        academicDepartment,
        course,
        faculty
    } = payload

    // check if the semester registration id is exists!
    const isSemesterRegistrationExists = await SemesterRegistration
        .findById(semesterRegistration)

    if(!isSemesterRegistrationExists){
        throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found!')
    }

    const academicSemester = isSemesterRegistrationExists.academicSemester

     // check if the academic faculty id is exists!
    const isAcademicFacultyExists = await AcademicFaculty
        .findById(academicFaculty)

    if (!isAcademicFacultyExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty is not found!')
    }
    
     // check if the academic faculty id is exists!
    const isAcademicDepartmentExists = await AcademicDepartment
        .findById(academicDepartment)

    if (!isAcademicDepartmentExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic Department is not found!')
    }
    
     // check if the academic department id is exists!
    const isCourseExists = await Course
        .findById(course)

    if (!isCourseExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course is not found!')
    }
    
     // check if the academic department id is exists!
    const isFacultyExists = await Course
        .findById(faculty)

    if (!isFacultyExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not found!')
    }

    const result = await OfferedCourse.create({...payload,academicSemester});
    return result
}

export const OfferCourseServices = {
    createOfferedCourseIntoDB
}