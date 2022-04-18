const express = require('express')
const { resolve } = require('path')

const run = (port = 5000, buildPath = resolve(__dirname, '..', 'build')) => {
  const app = express()

  app.use(express.static(buildPath))

  app.get('/', (req, res) => {
    res.sendFile(resolve(buildPath, 'index.html'))
  })

  app.listen(port, () => {
    console.log(`Server starting on port ${port}...`)
  })
}

run()
