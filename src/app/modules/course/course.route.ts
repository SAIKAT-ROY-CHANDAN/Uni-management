import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseController } from './course.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
    '/create-course',
    auth(
        USER_ROLE.admin, USER_ROLE.superAdmin
    ),
    validateRequest(CourseValidation.createCourseValidationSchema),
    CourseController.createCourse
);

router.get(
    '/:id',
    auth(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.faculty,
        USER_ROLE.student
    ),
    CourseController.getSingleCourse
);

router.get('/',
    auth(
        USER_ROLE.admin,
        USER_ROLE.faculty,
        USER_ROLE.student,
        USER_ROLE.superAdmin
    ),
    CourseController.getAllCourses);

router.delete('/:id',
    auth(
        USER_ROLE.admin,
        USER_ROLE.superAdmin
    ),
    CourseController.deleteCourse);

router.put('/:courseId/assign-faculties',
    auth(
        USER_ROLE.admin,
        USER_ROLE.superAdmin,
    ),
    validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
    CourseController.assignFacultiesWithCourse
)

router.get(
    '/:courseId/get-faculties',
    auth(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.faculty,
        USER_ROLE.student,
    ),
    CourseController.getFacultiesWithCourse,
);

router.delete('/:courseId/assign-faculties',
    auth(
        USER_ROLE.admin,
        USER_ROLE.superAdmin
    ),
    validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
    CourseController.removeFacultiesFromCourse
)

router.patch(
    '/:facultyId',
    auth(
        USER_ROLE.admin,
        USER_ROLE.superAdmin
    ),
    validateRequest(
        CourseValidation.updateCourseValidationSchema
    ),
    CourseController.updateCourse,
);
export const CourseRoutes = router