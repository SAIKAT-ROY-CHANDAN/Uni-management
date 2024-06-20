/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandlers from './app/middlewares/globalErrorHandlers';
import notFound from './app/middlewares/notFoundRoute';
import router from './app/router';
import cookieParser from 'cookie-parser';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: ['http://localhost:5173']}))

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
