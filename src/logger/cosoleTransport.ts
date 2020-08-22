import winston from 'winston';

export default function (silent = false): winston.transport {
  return new winston.transports.Console({ silent });
}
