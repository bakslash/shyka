const express =require('express')
const cors = require('cors')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')


const app =express()

// parse requests of content-type - application/json
app.use(express.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
app.use(cors({'origin':'*'}))
app.use('/users',userRoutes)
app.use('/auth',authRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{console.log(`magic happens at ${PORT}`);})