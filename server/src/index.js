require('dotenv').config();
const express = require('express');
const cors = require('cors');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');

const routes = require('./routes');
const app = express();

mongoose.connect('mongodb://localhost:27017/akbreader', {useNewUrlParser: true});

app.use(cors());
app.use(express.json());
app.use(expressValidator());
app.use('/api', routes);
app.use((err, req, res, next) => {
  res.status(err.status).json({
    ...err,
    message: err.message,
  });
});

app.listen(process.env.PORT || 8000, () => { console.log('listening'); });