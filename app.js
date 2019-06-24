const express = require('express')
const app = express();

const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors  = require('cors')

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(cors())

//personalizar puerto
const port = process.env.PORT || 3069

//rutas
require('./src/routes/congreso')(app)

app.listen(port, () => {
    console.log(`corriendo en el puerto ${port}`)
})