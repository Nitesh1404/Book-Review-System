const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router
	.route('/:id/review')
	.post(fetchUser, reviewController.addReview);


router
	.route('/:id')
	.put(fetchUser, reviewController.updateReview)
	.delete(fetchUser, reviewController.deleteReview);


module.exports = router;