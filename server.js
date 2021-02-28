const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')

dotenv.config({path: './config/config.env'})

const transactions = require('./routes/transactions')

const app = express()

app.get('/', (req, res) => res.send('Hello'))

const PORT = process.env.PORT || 5020

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))