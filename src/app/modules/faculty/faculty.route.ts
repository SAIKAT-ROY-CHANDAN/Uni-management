import express from "express"
import { FacultyControllers } from "./faculty.controller"
import validateRequest from "../../middlewares/validateRequest";
import { updateFacultyValidationSchema } from "./faculty.validation";

const router = express.Router()

router.patch(
    '/:id',
    validateRequest(updateFacultyValidationSchema),
    FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/:id', FacultyControllers.getSingleFaculty);

router.get('/', FacultyControllers.getAllFaculties)

export const FacultyRoutes = router;