const { response } = require('express')
const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const typeRoutes = require('./routes/typeRotues')
const categoryRoutes = require('./routes/categoryRoutes')
const cardRoutes = require('./routes/cardRoutes')
const testRoutes = require('./routes/testRoutes')
const questionRoutes = require('./routes/questionRoutes')
const answerRoutes = require('./routes/answerRoutes')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')



connectDB()

const app = express()

app.use(cors())
app.use(bodyParser.json())
//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/types',typeRoutes)
app.use('/api/categories',categoryRoutes,require('./routes/categoryRoutes'))
app.use('/api/cards',cardRoutes, require('./routes/cardRoutes'))
app.use('/api/tests',testRoutes,require('./routes/testRoutes'))
app.use('/api/questions',questionRoutes,require('./routes/questionRoutes'))
app.use('/api/answers',answerRoutes,require('./routes/answerRoutes'))

// Frontend
// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontend/build')))
//     app.get('*',(req,res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//     )
//   )
// } else {
//     app.get('/', (req,res) => res.send('Set to production'))
// }


app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))