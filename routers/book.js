const express = require('express')
const Book = require("../controllers/book");
const router = express.Router()

router.post('/', Book.create)
router.get('/', Book.find)

module.exports = router