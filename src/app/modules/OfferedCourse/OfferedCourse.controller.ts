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

const getAllOfferedCourses = catchAsync(async (req: Request, res: Response) => {
    const result = await OfferCourseServices.getAllOfferedCoursesFromDB(req.query)

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'OfferedCourses retrieved successfully !',
        data: result,
      });
});

const getSingleOfferedCourses = catchAsync(
    async (req: Request, res: Response) => {

      const { id } = req.params;
        const result = await OfferCourseServices.getSingleOfferedCourseFromDB(id)
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'OfferedCourse fetched successfully',
          data: result,
        });
    },
);

const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
  
    const result = await OfferCourseServices.updateOfferedCourseIntoDB(
      id,
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourse updated successfully',
      data: result,
    });
});


const deleteOfferedCourseFromDB = catchAsync(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const result = await OfferCourseServices.deleteOfferedCourseFromDB(id);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'OfferedCourse deleted successfully',
        data: result,
      });
    },
  );

export const OfferedCourseControllers = {
    createOfferedCourse,
    getAllOfferedCourses,
    getSingleOfferedCourses,
    updateOfferedCourse,
    deleteOfferedCourseFromDB
}