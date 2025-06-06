const express = require('express');
const bookContoller = require('../controllers/bookController');
const fetchUser = require('../middleware/fetchUser');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router
	.route('/')
	.get(bookContoller.getAllBooks)
	.post(fetchUser, bookContoller.createBooks);

router
	.route('/:id')
	.get(bookContoller.getBook);




module.exports = router;
