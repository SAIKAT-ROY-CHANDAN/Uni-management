import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseController } from './course.controller';

const router = express.Router();

router.post(
    '/create-course',
    validateRequest(CourseValidation.createCourseValidationSchema),
    CourseController.createCourse
);

router.get(
    '/:id',
    CourseController.getSingleCourse
);

router.get('/', CourseController.getAllCourses);

router.delete('/:id', CourseController.deleteCourse);

router.put('/:courseId/assign-faculties',
    validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
    CourseController.assignFacultiesWithCourse
)

router.delete('/:courseId/assign-faculties',
    validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
    CourseController.removeFacultiesFromCourse
)

router.patch(
    '/:facultyId',
    validateRequest(
        CourseValidation.updateCourseValidationSchema
    ),
    CourseController.updateCourse,
);
export const CourseRoutes = router