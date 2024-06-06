import express from 'express'
import { AcademicSemesterController } from './academic.controller';

import { AcademicSemesterValidations } from './academic.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidations.createAcademicValidationSchema),
  AcademicSemesterController.createAcademicSemester
);

router.get(
  '/:semesterId',
  AcademicSemesterController.getSingleAcademicSemester,
);

router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
);

router.get('/', AcademicSemesterController.getAllAcademicSemesters);

export const AcademicSemesterRoutes = router