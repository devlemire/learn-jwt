require('dotenv').config({ path: `${__dirname}/.env` })
const express = require('express')
const path = require('path')

const { PORT } = process.env

const app = express()

app.use('/api', require('./routes/index'))

// Serve front-end files
app.use(express.static(`${__dirname}/public/dist`))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/public/dist/index.html`))
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`))
