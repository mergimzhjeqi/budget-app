const express = require('express')
const dbConnect = require('./dbConnect')
const app = express()

app.use(express.json())



const userRoute = require('./routes/userRoutes')
const transactionRoute = require('./routes/transactionsRoute')

app.use('/api/users', userRoute)
app.use('/api/transaction', transactionRoute)

const port = 5000



app.listen(port, () =>
    console.log(`Node JS Server started at port: ${port}!`)
)