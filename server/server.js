import express from 'express'
import cors from 'cors'
import path from 'path'
const wakeUpDyno = require('./routes/wakeUpDyno.js')


import guessRoute from './routes/guess'

const isProduction = process.env.NODE_ENV === 'production'

const app = express()

// init middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  if (isProduction && req.headers['x-forwarded-proto'] !== 'https')
    return res.redirect('https://' + req.headers.host + req.url)
  return next()
})

// define routes
app.use('/api/guess', guessRoute)

const port = process.env.PORT || 4000

if (isProduction) {
  // set static folder
  const publicPath = path.join(__dirname, '..', 'build')

  app.use(express.static(publicPath))

  app.get('*', (_, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
  })
}
//const DYNO_URL = "http://localhost:5000";
const DYNO_URL = "https://acs-web-final-project.herokuapp.com";
app.listen(port, () => {
  wakeUpDyno(DYNO_URL);
  console.log(`Server is up on port ${port}.`)
})
