// Server Dependencies
require('dotenv').config({ path: `${__dirname}/.env` })
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

// ENV variables
const { PORT, NODE_ENV } = process.env

// Express App
const app = express()

// Ready JSON from requests
app.use(express.json())
// Log incoming API requests
app.use(morgan('dev'))

// Server Routes
app.use('/api', require('./routes/index'))

// Serve front-end files
app.use(express.static(`${__dirname}/public/dist`))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/public/dist/index.html`))
})

// Initialize lowdb on the first server start
const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ users: [] }).write()

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on NODE_ENV ${NODE_ENV}`)
  console.log(`Server listening on port ${PORT}.`)
})
