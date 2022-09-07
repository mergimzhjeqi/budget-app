const mongoose = require('mongoose')
const connect = mongoose.connect('mongodb+srv://mergim:mergim1234@cluster0.lg6giwa.mongodb.net/money-tracker',
 { useNewUrlParser: true, useUnifiedTopology: true })

 const connection = mongoose.connection

 connection.on('error', err => console.log(err))

 connection.on('connected', () => console.log('Mongo DB Connection Succesfull.'))