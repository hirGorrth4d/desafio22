const express = require('express')
const path = require('path');
const app = express()
const http = require('http')
const httpServer = http.Server(app)
const newIoServer = require('./socket');
const mainRouter = require('../routes/index')


app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(function(err, req,res, next) {
    return res.status(500).json({
        msg:'there was an error',
        error: err.message
    })
})

const publicpath = path.resolve(__dirname, '../../public')
app.use(express.static(publicpath))

app.set('view engine', 'ejs')

const viewPath = path.resolve(__dirname, '../../views/pages')
app.set('views', viewPath)

newIoServer(httpServer)

app.get('/', async (req,res) => {
    res.render('index')
})

app.use('/api', mainRouter)

module.exports = httpServer