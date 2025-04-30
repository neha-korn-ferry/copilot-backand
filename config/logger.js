import winston from 'winston';
import expressWinston from 'express-winston';

// Define the log format for a more structured and readable output
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message, metadata }) => {
    // Structure the log output to include request details
    const metaDetails = metadata ? `\nMetadata: ${JSON.stringify(metadata, null, 2)}` : '';
    return `${timestamp} [${level}] ${message}${metaDetails}`;
  })
);

// Create the logger
const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), logFormat) }),
    new winston.transports.File({ filename: 'logs/app.log', level: 'info' }),
  ],
});

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
  meta: true,  // Log the metadata (headers, body, params, query, etc.)
  msg: `HTTP {{req.method}} {{req.url}}`,
  expressFormat: true,
  colorize: true,
  dynamicMeta: (req, res) => {
    return {
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query,
    };
  },
});

export { logger, requestLogger };
