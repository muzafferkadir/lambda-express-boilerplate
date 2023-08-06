const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send(`Hello worldd! Some env var: ${process.env.TEST}`)
})

module.exports = app