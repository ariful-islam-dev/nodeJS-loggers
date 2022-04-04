const express = require("express");
const morgan = require('morgan')
const app = express();
const logger = require('./logger')


app.use(morgan("tiny"))

app.get("/", (req, res) => {
  // logger.log(`${req.method} -${req.url} - ${new Date().toISOString()}`);
 return res.status(200).json({ message: "Welcome" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.log(`Server is listening on port ${PORT}`);
});

