const mongoose = require('mongoose')
const express = require('express')

const app = express();
const paginatedResults = require("./middleware/pagination");

require('./db/conn');
const Book= require("./model/bookSchema");

const db = mongoose.connection
db.once('open', async () => {
 if (await Book.countDocuments().exec() > 0) return

  Promise.all([
    Book.create({ name: 'book 1' }),
    Book.create({ name: 'book 2' }),
    Book.create({ name: 'book 3' }),
    Book.create({ name: 'book 4' }),
    Book.create({ name: 'book 5' }),
    Book.create({ name: 'book 6' }),
    Book.create({ name: 'book 7' }),
    Book.create({ name: 'book 8' }),
    Book.create({ name: 'book 9' }),
    Book.create({ name: 'book 10' }),
    Book.create({ name: 'book 11' }),
    Book.create({ name: 'book 12' }),
    Book.create({ name: 'book 13' }),
    Book.create({ name: 'book 14' }),
    Book.create({ name: 'book 15' }),
    Book.create({ name: 'book 16' }),
    Book.create({ name: 'book 17' }),
    Book.create({ name: 'book 18' }),
    Book.create({ name: 'book 19' }),
    Book.create({ name: 'book 20' }),
    Book.create({ name: 'book 21' }),
    Book.create({ name: 'book 22' }),
    Book.create({ name: 'book 23' }),
    Book.create({ name: 'book 24' })
  ]).then(() => console.log('Added book'))
})

app.get('/',(req,res) =>{
    res.send("Welcome to paginated book.");
})

app.get('/books',paginatedResults(Book),(req,res) =>{
    res.json(res.paginatedResults);
})

app.listen('8080',()=>{
    console.log("okk")
})

