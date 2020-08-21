import express from 'express';
import Router from './rotuers';
import errorHandler from './controller/error';

const app = express();
app.use('/', Router);

app.get('/', (req, res) => {
  res.send('hello');
});

app.use(errorHandler);

export default app;
