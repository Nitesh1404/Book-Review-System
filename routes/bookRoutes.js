const express = require('express');
const bookContoller = require('../controllers/bookController');

const router = express.Router();

router
	.route('/')
	.get(bookContoller.getAllBooks)
	.post(bookContoller.createBooks);

router
	.route('/:id')
	.get(bookContoller.getBook);


module.exports = router;
