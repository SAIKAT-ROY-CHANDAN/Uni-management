import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { EnrolledCourseValidations } from './enrolledCourse.validation';
import { EnrolledCourseControllers } from './enrolledCourse.controller';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
    '/create-enrolled-course',
    auth('student'),
    validateRequest(
        EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
    ),
    EnrolledCourseControllers.createEnrolledCourse,
);

router.get(
    '/my-enrolled-courses',
    auth(USER_ROLE.student),
    EnrolledCourseControllers.getMyEnrolledCourses,
  );

router.patch(
    '/update-enrolled-course-marks',
    auth('faculty', 'admin'),
    validateRequest(
        EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
    ),
    EnrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;