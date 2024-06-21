import express, { NextFunction, Request, Response } from 'express'
import { UserController } from './user.controller'
import { createStudentValidationSchema } from '../student/student.validation'
import { createFacultyValidationSchema } from '../faculty/faculty.validation'
import validateRequest from '../../middlewares/validateRequest'
import { createAdminValidationSchema } from '../admin/admin.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.constant'
import { UserValidation } from './user.validation'
import { upload } from '../../utils/sendImageToCloud'

const router = express.Router()


router.post('/create-student',
    auth(USER_ROLE.admin),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data)
        next()
    },
    validateRequest(createStudentValidationSchema),
    UserController.createStudent)

router.post('/create-faculty',
    auth(USER_ROLE.admin),
    validateRequest(createFacultyValidationSchema),
    UserController.createFaculty)

router.post(
    '/create-admin',
    // auth(USER_ROLE.admin),
    validateRequest(createAdminValidationSchema),
    UserController.createAdmin,
);

router.post(
    '/change-status/:id',
    auth('admin'),
    validateRequest(UserValidation.changeStatusValidationSchema),
    UserController.changeStatus,
);


router.get('/me', auth('student', 'faculty', 'admin'), UserController.getMe);

export const UserRoutes = router