import express from 'express'
import { AcademicSemesterController } from './academic.controller';

import { AcademicSemesterValidations } from './academic.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(AcademicSemesterValidations.createAcademicValidationSchema),
  AcademicSemesterController.createAcademicSemester
);

router.get(
  '/:semesterId',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.student,
    USER_ROLE.faculty
  ),
  AcademicSemesterController.getSingleAcademicSemester,
);

router.patch(
  '/:semesterId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
);

router.get('/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.student,
    USER_ROLE.faculty
  ),
  AcademicSemesterController.getAllAcademicSemesters);

export const AcademicSemesterRoutes = router