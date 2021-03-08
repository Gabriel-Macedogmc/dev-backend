import 'reflect-metadata';
import { AppError } from '@/shared/errors/AppError';
import '../../container';
import Express, { json, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import '../typeorm/connection';

import routes from './routes/index';

const app = Express();

app.use(json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    error: 'error',
    message: err.message,
  });
});

app.listen(3333, () => console.log('server on'));
