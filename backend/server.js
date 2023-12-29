const express = require('express'),
    mongoose = require('mongoose');
    let cors = require('cors'); 
// const { default: router } = require('./routes');

let mongoDatabase = 'mongodb://localhost:27017/Login-app';
const app = express();

mongoose.connect(mongoDatabase, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('There is problem while connecting database ' + err) });

app.use(express.json());
const userRoutes = require('../backend/Routes/UserRoutes') 
const port = 3001;

app.use(cors()); 
app.use('/user', userRoutes) 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});