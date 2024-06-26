const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const authRouter = require('./routes/api/auth')
const partnersRouter = require('./routes/api/partners')
const paymentsRouter = require('./routes/api/payments')
const exercisesRouter = require('./routes/api/exercises')
const clientsRouter = require('./routes/api/clients')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter)
app.use('/api/partners', partnersRouter)
app.use('/api/payments', paymentsRouter)
app.use('/api/exercises', exercisesRouter)
app.use('/api/clients', clientsRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = 'Server error'} = err;
  res.status(status).json({ message })
})

module.exports = app
