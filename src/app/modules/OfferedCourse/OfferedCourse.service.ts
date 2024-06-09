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
        section,
        faculty,
        days,
        startTime,
        endTime,
    } = payload

    // check if the semester registration id is exists!
    const isSemesterRegistrationExists = await SemesterRegistration
        .findById(semesterRegistration)

    if (!isSemesterRegistrationExists) {
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

    //check if the department is belong to the faculty
    const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
        _id: academicDepartment,
        academicFaculty,
    })

    if (!isDepartmentBelongToFaculty) {
        throw new AppError(httpStatus.BAD_REQUEST, `${isAcademicDepartmentExists} does not belong to this ${isAcademicFacultyExists}`)
    }

    const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection = await OfferedCourse.findOne({
        semesterRegistration,
        course,
        section
    })

    if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
        throw new AppError(httpStatus.BAD_REQUEST, `Offered course with same section already exist`)
    }

    //get the schedule of the faculties
    const assignSchedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days }
    }).select('days startTime endTime')

    const newSchedule = {
        days,
        startTime,
        endTime
    }

    assignSchedules.forEach((schedule) => {
        const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`)
        const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`)
        const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`)
        const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`)

        if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
            throw new AppError(httpStatus.CONFLICT, `This faculty is not available that time`)
        }
    })

    const result = await OfferedCourse.create({ ...payload, academicSemester });
    return result
}

export const OfferCourseServices = {
    createOfferedCourseIntoDB
}