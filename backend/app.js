import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import jobRouter from './routes/jobRoute.js';

const app = express();

app.use(morgan('dev'));

// TO DO --> change origin
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use('/jobs', jobRouter);

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
