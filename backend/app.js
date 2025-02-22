import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import jobRouter from './routes/jobRoute.js';

const app = express();

app.use(morgan('dev'));

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5173'
        : 'https://holly-6uz.pages.dev',
  })
);

app.use('/api/v1/jobs', jobRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  return res.status(status).json({
    status: 'error',
    statusCode: status,
    message: err.message,
    stack: err.stack,
  });
});

export default app;
