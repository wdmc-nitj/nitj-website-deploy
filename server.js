const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const compression = require('compression')
const mainRouter = require('./routes')
const { admin_panel, router } = require('./admin_panel')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')

const redirects = require('./redirects.json')

// process.on("unhandledRejection", (err) => {
//   console.log("unhandleed rejection occured");
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });

//initialize app
const app = express()

//admin panel
app.use(admin_panel.options.rootPath, router)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json({ limit: '5mb' }))
bodyParser.urlencoded({ extended: true })

app.use('*', (req, res, next) => {
  if (redirects[req.originalUrl]) {
    return res.redirect(redirects[req.originalUrl])
  }
  next()
})

app.use(express.static(__dirname + '/public'))
app.use('/files', express.static(path.join(__dirname, '..', 'nitj_files')))

//allowing all cross origin requests
app.use(
  cors({
    origin: '*',
  })
)

app.use('/api', mainRouter)
app.use('*', (req, res) => {
  return res.redirect(`https://v1.nitj.ac.in${req.originalUrl}`)
})

mongoose.set('strictQuery', false)

//server listening------------------------------------------------->
const port = process.env.PORT || 8000

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('connection to database eshtablished')
    app.listen(port, () => {
      console.log(`Server started on port ${port}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })

process.on('uncoughtException', (err) => {
  console.log(err.name, err.message)
  process.exit(1)
})
