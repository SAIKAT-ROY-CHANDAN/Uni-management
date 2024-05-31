import express from 'express'
import validationRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';

const router = express.Router();

router.post(
    '/create-academic-Department', 
    validationRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema),
    AcademicDepartmentControllers.createAcademicDepartment
);

router.get(
    '/:departmentId',
    AcademicDepartmentControllers.getSingleAcademicDepartment
  );
  
  router.patch(
    '/:departmentId',
    validationRequest(
      AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
    ),
    AcademicDepartmentControllers.updateAcademicDepartment,
  );

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);

export const AcademicDepartmentRoutes = router