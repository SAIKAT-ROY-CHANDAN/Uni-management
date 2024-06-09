import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { OfferCourseServices } from "./OfferedCourse.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createOfferedCourse = catchAsync(async (req:Request, res:Response) => {
    const result = await OfferCourseServices.createOfferedCourseIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Offered Course Created successfully",
        data: result
    })
})

export const OfferedCourseControllers = {
    createOfferedCourse
}