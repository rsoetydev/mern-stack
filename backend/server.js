require('dotenv').config();


const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes) //gets routes from the workouts file

// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen for requests 
    app.listen(process.env.PORT, () => {
        console.log("connected to db & listening on port port", process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})

