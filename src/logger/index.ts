import winston, { format } from 'winston';
import createConsoleTransport from './cosoleTransport';

const logger = winston.createLogger({
  transports: [createConsoleTransport(process.env.NODE_ENV === 'test')],
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.json()
  ),
});

export default logger;
