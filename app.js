const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require("dotenv");
let session = require('express-session')

const mainRouter = require('./routes/mainRouter.js');
const userRouter = require('./routes/userRouter.js');

const port = process.env.PORT || '3001'

let app = express();

// view engine setup
app.set('views', './views');
app.set('view engine', 'jade');

dotenv.config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));
app.use(cors())
app.use(session({
  secret: "el peluca sapee!",
  resave: false,
  saveUninitialized: false,
}));

app.use('/', mainRouter);
app.use('/users', userRouter)

app.listen(port, ()=>{
  console.log(`Servidor corriendo en http://localhost:${port}`)
})

module.exports = app;