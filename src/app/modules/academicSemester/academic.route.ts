import express from 'express'
import { AcademicSemesterController } from './academic.controller';
import validationRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academic.validation';

const router = express.Router();

router.post(
    '/create-academic-semester', 
    validationRequest(AcademicSemesterValidations.createAcademicValidationSchema),
    AcademicSemesterController.createAcademicSemester
);

router.get(
    '/:semesterId',
    AcademicSemesterController.getSingleAcademicSemester,
  );
  
  router.patch(
    '/:semesterId',
    validationRequest(
      AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterController.updateAcademicSemester,
  );

router.get('/', AcademicSemesterController.getAllAcademicSemesters);

export const AcademicSemesterRoutes = router