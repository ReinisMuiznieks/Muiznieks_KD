const { response } = require('express')
const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const typeRoutes = require('./routes/typeRotues')
const categoryRoutes = require('./routes/categoryRoutes')
const cardRoutes = require('./routes/cardRoutes')

connectDB()

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/types',typeRoutes)
app.use('/api/categories',categoryRoutes,require('./routes/categoryRoutes'))
app.use('/api/cards',cardRoutes, require('./routes/cardRoutes'))


app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))