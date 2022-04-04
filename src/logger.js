// const logger = {
// log: console.log,
// error: console.info,
// info: console.info,
// warn: console.warn,
// debug: console.debug,

// };

const winston = require("winston");
const format = winston.format;

const logger = winston.createLogger({
  level: "debug",
  format: format.combine(
   format.colorize(),
   format.timestamp(),
   format.align(),
   format.printf(({level, message, timestamp, ...args})=>{
    const ts = timestamp.slice(0, 19).replace('T', '')
    return `${ts} ${level}: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2): ''}`
   })
  ),
  transports: [new winston.transports.Console(),  new winston.transports.File({
    filename: 'error.log',
    level: 'error',
    format: winston.format.json()
  }),]
});

module.exports = logger;
