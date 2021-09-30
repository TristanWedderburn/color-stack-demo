const express = require('express')
// Import the models we need
const Author = require('../controllers/author')

const router = express.Router()

// Example POST request using cURL:
// curl -X POST -H "Content-Type: application/json" -d '{"firstName": "tristan", "lastName": "wedderburn"}' http://localhost:4200/author/
router.post('/', Author.create)

// Example query for author with firstName = tristan & lastName=wedderburn:
// http://localhost:4200/author?firstName=tristan&lastName=wedderburn
router.get('/', Author.get)

// Note: Will cover if I have time
// Example query for author with firstName = tristan & lastName=wedderburn:
// http://localhost:4200/author?id=123
router.delete('/', Author.remove)

// Example PUT request using cURL:
// curl -X PUT -H "Content-Type: application/json" -d '{"id": "1234", "birthday": "1/1/2020"}' http://localhost:4200/author/
router.put('/', Author.update)

module.exports = router