const express = require("express");
const app = express();
const logger = require('./logger')

app.get("/", (req, res) => {
  logger.log(`${req.method} -${req.url} - ${new Date().toISOString()}`);
  res.status(200).json({ message: "Welcome" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.log(`Server is listening on port ${PORT}`);
});

logger.log('Hello');
logger.error('Error');
logger.info('Information')
logger.warn('Warning');
logger.debug('Debug')