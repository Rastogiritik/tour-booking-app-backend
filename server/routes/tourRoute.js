const express = require('express');

const router = express.Router();
const { registerTour, 
        updateTour,
        deleteTour,
        getSingleTour,
        getAllTours,
        searchTours,
        getFeaturedTour,
        getAllToursCounts } = require('../controllers/tourController.js');

const {
        verifyUser,
        verifyAdmin,
        } = require('../middlewares/verifyToken.js')

router.route('/newTour').post(verifyAdmin, registerTour)

router.route('/updateTour/:id').put(verifyAdmin, updateTour )

router.route('/deleteTour/:id').delete(verifyAdmin, deleteTour )

router.route('/tour/:id').get( getSingleTour )

router.route('/allTours').get( getAllTours )

router.route('/searchTours/:key').get( searchTours )

router.route('/getFeaturedTours').get( getFeaturedTour )

router.route('/getCount').get( getAllToursCounts )

module.exports = router;