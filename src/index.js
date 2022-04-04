const express = require("express");
const uuid = require('uuid')
const app = express();
const logger = require('./logger')
const useMorgan = require('./useMorgan')

app.use((req, _res, next)=>{
  const id = uuid.v4();
  req.id = id;
  next()
})

useMorgan(app)




// app.use(morgan(":date[iso] | :method | :url | :status | :response-time[4]ms | Random Number :random || Request id- :request-id"))

// app.use(morgan((tokens, req, res)=>{
//   return JSON.stringify({
//     method: tokens['method'](req, res),
//     status: tokens['status'](req, res),
//     random: tokens['random'](req, res),
//     requestId: tokens['request-id'](req, res)
//   })
// }))

app.get("/", (req, res) => {
  // logger.log(`${req.method} -${req.url} - ${new Date().toISOString()}`);
 return res.status(200).json({ message: "Welcome" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.log(`Server is listening on port ${PORT}`);
});

