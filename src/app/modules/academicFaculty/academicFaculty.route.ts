import express from 'express'
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
    '/create-academic-faculty', 
    validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema),
    AcademicFacultyControllers.createAcademicFaculty
);

router.get(
    '/:facultyId',
    AcademicFacultyControllers.getSingleAcademicFaculties
  );
  
  router.patch(
    '/:facultyId',
    validateRequest(
      AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
    ),
    AcademicFacultyControllers.updateAcademicFaculties,
  );

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);

export const AcademicFacultyRoutes = router