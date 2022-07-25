const express = require('express')
const path = require('path');
const app = express()
const http = require('http')
const server = http.createServer(app)
const port = process.env.PORT || 8080
const newIoServer = require('./services/socket');
const viewPath = path.resolve(__dirname, '../views/pages')

app.use(express.static(__dirname + '/src/public'))
app.set('views', viewPath)
app.set('view engine', 'ejs')


app.use(express.urlencoded({extended: true}))
app.use(express.json())

newIoServer(server)


app.get('/', async (req, res) => {
    res.render('index')
    })
    
app.use('/api', mainRouter);
    

app.listen(port, () => {
    console.log('Running on port ' + port)
})