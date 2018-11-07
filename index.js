// Server Dependencies
require('dotenv').config({ path: `${__dirname}/.env` })
const express = require('express')
const path = require('path')

// ENV variables
const { PORT, NODE_ENV } = process.env

// Express App
const app = express()
app.use(express.json())

// Server Routes
app.use('/api', require('./routes/index'))

// Serve front-end files
app.use(express.static(`${__dirname}/public/dist`))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/public/dist/index.html`))
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on NODE_ENV ${NODE_ENV}`)
  console.log(`Server listening on port ${PORT}.`)
})
