import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model"
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result
}

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(Course
        .find()
        .populate('preRequisiteCourses.course')
        , query
    )
        .search(CourseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields()

    const result = await courseQuery.modelQuery
    return result
}

const getSingleCourseFromDB = async (id: string) => {
    const result = await Course
        .findById(id)
        .populate('preRequisiteCourses.course');

    return result
}

const deleteCourseFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id,
        { isDeleted: true },
        { new: true }
    );
    return result
}

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {

    const { preRequisiteCourses, ...courseRemainingData } = payload

    // Starting Transaction Because We are writing the DB several times
    const session = await mongoose.startSession()

    try {
        session.startTransaction()

        const updateBasicCourseInfo = await Course.findByIdAndUpdate(
            id,
            courseRemainingData,
            { new: true, runValidators: true, session }
        )

        if (!updateBasicCourseInfo) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
        }

        if (preRequisiteCourses && preRequisiteCourses.length > 0) {

            const deletedPreRequisites = preRequisiteCourses
                .filter(el => el.course && el.isDeleted)
                .map(el => el.course)

            const deletedPreRequisitesCourses = await Course.findByIdAndUpdate(
                id,
                { $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisites } } } },
                { new: true, runValidators: true, session }
            )

            if (!deletedPreRequisitesCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
            }

            const newPreRequisites = preRequisiteCourses
                ?.filter(el => el.course && !el.isDeleted)

            const newPreRequisiteCourse = await Course.findByIdAndUpdate(
                id,
                { $addToSet: { preRequisiteCourses: { course: { $in: newPreRequisites } } } },
                { new: true, runValidators: true, session }
            )

            if (!newPreRequisiteCourse) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
            }

            const result = await Course.findById(id)
                .populate('preRequisiteCourses.course')

            return result

        }

        await session.commitTransaction()
        await session.endSession()

    } catch (error) {
        await session.abortTransaction();
        await session.endSession()

        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update')
    }


}

export const CourseServices = {
    createCourseIntoDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB,
    updateCourseIntoDB
}