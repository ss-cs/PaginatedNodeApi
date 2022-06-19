const express = require('express')
const app = express()

const redis = require('redis')
const util =  require('util')
const redisurl  = "redis://127.0.0.1:6379"
const client = redis.createClient(redisurl)


client.on('connect', function() {
  console.log('Connected!');
});

client.set = util.promisify(client.set)
client.get = util.promisify(client.get)

app.use(express.json())

function paginatedResults(model) {
    return async (req, res, next) => {
      const page = parseInt(req.query.page)
      const limit = parseInt(req.query.limit)
  
      const startIndex = (page - 1) * limit
      const endIndex = page * limit
  
      const results = {}

      const cachedPost = await client.get(`page${page}limit${limit}`)

      if(cachedPost){
          return res.json(JSON.parse(cachedPost))
      }
  
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        }
      }
      
      if (endIndex < await model.countDocuments().exec()) {
        results.next = {
          page: page + 1,
          limit: limit
        }
      }
      
      results.current = {
        page: page,
        limit: limit
      }

      try {
        results.results = await model.find().limit(limit).skip(startIndex).exec()
        res.paginatedResults = results
        if(results.results.length == 0){
          results.message = "Page Limit Exceeded";
        }
        
        client.set(`page${page}limit${limit}`,JSON.stringify(results) ,"EX",30*60)
        next()
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
    }
  }


module.exports = paginatedResults;