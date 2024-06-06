import express from 'express'

import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-academic-Department',
  validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema),
  AcademicDepartmentControllers.createAcademicDepartment
);

router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment
);

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);

export const AcademicDepartmentRoutes = router