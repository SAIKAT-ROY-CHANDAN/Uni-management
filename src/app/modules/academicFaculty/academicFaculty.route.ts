import express from 'express'
import validationRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();

router.post(
    '/create-academic-faculty', 
    validationRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema),
    AcademicFacultyControllers.createAcademicFaculty
);

router.get(
    '/:facultyId',
    AcademicFacultyControllers.getSingleAcademicFaculties
  );
  
  router.patch(
    '/:facultyId',
    validationRequest(
      AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
    ),
    AcademicFacultyControllers.updateAcademicFaculties,
  );

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);

export const AcademicFacultyRoutes = router