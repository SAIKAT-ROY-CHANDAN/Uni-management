import express from 'express';
import { StudentControllers } from './student.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/:id',
    auth('superAdmin', 'admin'),
    StudentControllers.getSingleStudent);

router.patch('/:id',
    auth('superAdmin', 'admin'),
    StudentControllers.updateStudent);

router.delete('/:id',
    auth('superAdmin', 'admin'),
    StudentControllers.deleteStudent);

router.get('/',
    auth('superAdmin', 'admin', 'faculty'),
    StudentControllers.getAllStudents);

export const StudentRoutes = router;
