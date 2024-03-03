require('dotenv').config();
const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
const errorHandler = require('./middleware/errorHandler')
const { logger, logEvents } = require('./middleware/logger')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const cookieParser = require('cookie-parser')


connectDB()

app.use(logger)
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/auth',require('./routes/authRoutes'))
app.use('/user',require('./routes/userRoutes'))
app.use("/bank-account" , require("./routes/bankAccountRoutes"))
app.use("/bank-transfer", require("./routes/bankTransferRoutes"))
app.use("/comment", require("./routes/commentRoutes"))
app.use("/contact", require("./routes/contactRoutes"))
app.use('/likes', require('./routes/likeRoutes'))
app.use('/notification', require('./routes/notificationRoutes'))
app.use('transactions',require('./routes/transactionRoutes'))

app.all('*', (req, res) => {
    res.status(404)
        res.sendFile(path.join(__dirname, 'views', 'default.html'))
})

app.use(errorHandler)


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})