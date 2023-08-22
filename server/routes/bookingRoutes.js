const express = require('express');
const router = express.Router();

const { verifyAdmin, verifyUser } = require('../middlewares/verifyToken.js');
const { createBooking, getBookingbyId, getAllBooking } = require('../controllers/bookingController.js');

router.route('/').post( verifyUser, createBooking );

router.route('/:id').get(verifyUser, getBookingbyId);

router.route('/').get(verifyAdmin, getAllBooking);

// router.route().put();

// router.route().delete();

module.exports = router