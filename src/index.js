const express = require("express");
const morgan = require('morgan');
const uuid = require('uuid')
const app = express();
const logger = require('./logger')

app.use((req, _res, next)=>{
  const id = uuid.v4();
  req.id = id;
  next()
})

morgan.token("random", function (req, res) { return Math.round(Math.random() * 100) })
morgan.token('request-id', (req, res)=>{
  return req.id
})

app.use(morgan(":date[iso] | :method | :url | :status | :response-time[4]ms | Random Number :random || Request id- :request-id"))


app.get("/", (req, res) => {
  // logger.log(`${req.method} -${req.url} - ${new Date().toISOString()}`);
 return res.status(200).json({ message: "Welcome" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.log(`Server is listening on port ${PORT}`);
});

