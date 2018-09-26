const express = require('express')
const proxy = require('express-http-proxy')
const next = require('next')


const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
    .prepare()
    .then(() => {
        const server = express()
        // Forwarding Proxy 
        server.use('/api', proxy('name of the API server'))
        server.get("*", (req,res) => {
            return handle(req, res)
        })
        
        server.listen(PORT, err => {
            if (err) throw err
            console.log(`> Ready on ${PORT}`)
        })
    })
    .catch(ex => {
        console.log(ex.stack)
        process.exit(1)
    })