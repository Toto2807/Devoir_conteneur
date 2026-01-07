const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

require('./config/db_postgres.js')
require('./config/db_mongo.js')

app.use(express.json())

const userRoute = require('./routes/userRoute.js')
app.use('/user',userRoute)

const profilRoute = require('./routes/profilRoute.js')
app.use('/profil',profilRoute)

app.get('/',(req,res) =>{
    res.json({message: 'Server is running' })
})

app.listen(PORT,() =>{
    console.log(`Server ok sur : http://localhost:${PORT}`)
})