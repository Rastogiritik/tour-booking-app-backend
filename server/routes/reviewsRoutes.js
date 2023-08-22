const express = require('express');
const router = express.Router();

const { verifyAdmin, verifyUser } = require('../middlewares/verifyToken.js')
const { createReview } = require('../controllers/reviewController.js')

router.route('/:tourId').post( verifyUser, createReview);

// router.route().get();

// router.route().put();

// router.route().delete();

module.exports = router