import express from 'express'
import { UserController } from './user.controller'
import { createStudentValidationSchema } from '../student/student.validation'
import validationRequest from '../../middlewares/validateRequest'
import { createFacultyValidationSchema } from '../faculty/faculty.validation'

const router = express.Router()


router.post('/create-student',
    validationRequest(createStudentValidationSchema),
    UserController.createStudent)

router.post('/create-faculty',
    validationRequest(createFacultyValidationSchema),
    UserController.createFaculty)

export const UserRoutes = router