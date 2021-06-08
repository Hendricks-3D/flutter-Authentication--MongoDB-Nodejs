const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const passport = require('passport');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

connectDB();// connect to the database on startup
const app = express();

if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))
}

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(routes);



//start the server 
const PORT = process.env.PORT || 3000;// assign port  to local port 3000 or production port 
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mod on port ${PORT}`));