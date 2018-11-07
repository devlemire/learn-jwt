require('dotenv').config({ path: `${__dirname}/.env` })
const express = require('express')

const { PORT } = process.env

const app = express()

app.use('/api', require('./routes/index'))

app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`))
