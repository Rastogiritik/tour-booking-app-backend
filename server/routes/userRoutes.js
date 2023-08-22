const express = require('express');
const router = express.Router();

const {
    // registerUser,
    updateUser,
    deleteUser,
    getSingleUser,
    getAllUsers
                } = require('../controllers/userController.js')

const {
    verifyUser,
    verifyAdmin,
    verifyToken
                } = require('../middlewares/verifyToken.js')

// router.route('/newUser').post( registerUser)

router.route('/updateUser/:id').put( verifyUser, updateUser )

router.route('/deleteUser/:id').delete(verifyUser, deleteUser )

router.route('/:id').get( verifyUser, getSingleUser )

router.route('/').get( verifyAdmin, getAllUsers )


module.exports = router;