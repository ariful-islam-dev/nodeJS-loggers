const morgan = require('morgan')


morgan.token("random", function (req, res) { return Math.round(Math.random() * 100) })
morgan.token('request-id', (req, res)=>{
  return req.id
})

const useMorgan = (app)=>{

    if(process.env.NODE_ENV === 'production'){
        // update later
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

module.exports = useMorgan;