const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/pagination').then(() => {
    console.log('connection successful');
}).catch((error) => console.log(error));