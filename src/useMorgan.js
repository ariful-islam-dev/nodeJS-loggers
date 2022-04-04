const morgan = require('morgan')
const fs = require('fs');
const path = require('path')


morgan.token("random", function (req, res) { return Math.round(Math.random() * 100) })
morgan.token('request-id', (req, res)=>{
  return req.id
})


// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.resolve('logs', 'access.log'), { flags: 'a' })

const useMorgan = (app)=>{
    
    if(process.env.NODE_ENV && process.env.NODE_ENV === 'production'){
        console.log(process.env.NODE_ENV.length);
       app.use(morgan(prodFormat, {stream: accessLogStream}))
    }else{
        app.use(morgan('dev', {
            skip: (_req, res)=>{
                return res.statusCode < 400
            },
            stream: process.stderr,
        }))
        app.use(morgan('dev', {
            skip: (_req, res)=>{
                return res.statusCode >= 400
            },
            stream: process.stdout
        }))
    }
}


const prodFormat = (tokens, req, res)=>{
    return JSON.stringify({
      method: tokens['method'](req, res),
      status: tokens['status'](req, res),
      random: tokens['random'](req, res),
      requestId: tokens['request-id'](req, res)
    })
}
module.exports = useMorgan;