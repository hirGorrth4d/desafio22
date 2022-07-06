const express = require('express')
const {engine} = require('express-handlebars')
const app = express()
const http = require('http')
const server = http.createServer(app)
const port = process.env.PORT || 8080
const {Server} = require('socket.io')
const io = new Server(server)


app.use(express.static(__dirname + '/src/public'))
app.set('views', './views')
app.set('view engine', 'hbs')
app.engine('hbs', engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    defaultLayout: 'index',
    extname: 'hbs'
}))


app.use(express.json())
app.use(express.urlencoded({extended: true}))




app.get('/', async (req, res) => {
    res.render('index')
    })
    
app.use('/api', mainRouter);
    

app.listen(port, () => {
    console.log('Running on port ' + port)
})