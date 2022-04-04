// const logger = {
// log: console.log,
// error: console.info,
// info: console.info,
// warn: console.warn,
// debug: console.debug,

// };

const { createLogger, format,  transports } = require("winston");
// const format = winston.format;

// const logger = winston.createLogger({
//   level: "debug",
//   format: format.combine(
//    format.colorize(),
//    format.timestamp(),
//    format.align(),
//    format.printf(({level, message, timestamp, ...args})=>{
//     const ts = timestamp.slice(0, 19).replace('T', '')
//     return `${ts} ${level}: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2): ''}`
//    })
//   ),
//   transports: [new winston.transports.Console(),  new winston.transports.File({
//     filename: 'error.log',
//     level: 'error',
//     format: winston.format.json()
//   }),]
// });
const level = process.env.LOG_LEVEL || "debug";

const formateParams = ({ timestamp, level, message, ...args }) => {
  const ts = timestamp.slice(0, 19).replace("T", " ");

  return `${ts} ${level}: ${message} ${
    Object.keys(args).length > 0 ? JSON.stringify(args) : ""
  }`;
};
const devFormat = format.combine(
  format.colorize({ all: true }),
  format.timestamp(),
  format.align(),
  format.printf(formateParams)
);

const prodFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.printf(formateParams)
);

/**
 * @type {Logger}
 */
let logger = null;

if(process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production'){
  logger = createLogger({
    level,
    format:prodFormat,
    transports: [
      new transports.File({filename: 'logs/error.log', level: 'error'}),
      new transports.File({filename: 'logs/combine.log'}),
    ]
  })
}else{
 
  logger = createLogger({
    level,
    format: devFormat,
    transports: [
      new transports.Console()
    ]
  })
}

module.exports = logger;
