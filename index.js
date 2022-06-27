const express = require('express');
const app = express();
const { connect } = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const router = require('./routes/router');

dotenv.config();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static('public'));
app.use(router);


app.listen(process.env['BE_PORT'], () => {
    console.log('Server corriendo en el puerto', process.env['BE_PORT']);
    connect();
})