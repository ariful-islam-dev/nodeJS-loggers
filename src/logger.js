// const logger = {
// log: console.log,
// error: console.info,
// info: console.info,
// warn: console.warn,
// debug: console.debug,

// };

const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: new winston.transports.Console(),
});

module.exports = logger;
