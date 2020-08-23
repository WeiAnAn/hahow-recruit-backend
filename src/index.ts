import dotenv from 'dotenv';
dotenv.config();
import app from './app';

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server run on ${port} port`); //eslint-disable-line no-console
});
