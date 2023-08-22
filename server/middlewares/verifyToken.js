const jwt = require('jsonwebtoken');

const verifyToken = async(req, res, next) => {
    const token = req.cookies.accessToken

    if(!token){
        return res.status(404).json({success:false, message:"Please send the token"})
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err){
            return res.status(404).json({success:false, message:"Please send the valid token", data:err})
        }

        req.user= user
        next();
    })
}


const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () =>{
        if (req.user.id === req.params.id || req.user.role === "admin") {
            next();
        } else {
            return res.status(404).json({success:false, message:"You are not authenticated"})

        }
    })
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () =>{
        if ( req.user.role === "admin") {
            next();
        } else {
            return res.status(404).json({success:false, message:"You are not authorize"})
        }
    })
}

module.exports = {
    verifyUser,
    verifyAdmin

}