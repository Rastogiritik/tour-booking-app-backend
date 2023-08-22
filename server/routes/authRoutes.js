const express = require('express')

const router = express.Router();

const {
    verifyUser,
    verifyAdmin,
    verifyToken
} = require('../middlewares/verifyToken.js')

const { registerUser,
        loginUser } = require('../controllers/authController.js')

router.route('/register').post( registerUser )

router.route('/login').post( loginUser )

module.exports = router;