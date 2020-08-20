import express from 'express';
import Router from './rotuers';
import errorHandler from './controller/error';

const app = express();
app.use('/', Router);

app.get('/', (req, res) => {
  res.send('hello');
});

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server run on ${port} port`); //eslint-disable-line no-console
});
