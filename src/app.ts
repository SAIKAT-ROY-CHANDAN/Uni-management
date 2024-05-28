/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandlers from './app/middlewares/globalErrorHandlers';
import notFound from './app/middlewares/notFoundRoute';
import router from './app/router';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  const a = "Hello from the other side 😉";
  res.send(a);
};

app.get('/', test);

app.use(globalErrorHandlers);

app.use(notFound)


export default app;
