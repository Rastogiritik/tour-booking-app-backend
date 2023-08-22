const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {

    if( req.body.username && req.body.email  && req.body.password ){
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashPassword =  bcrypt.hashSync(req.body.password, salt)
        const newUser = new User(
            {
                username: req.body.username,
                email: req.body.email,
                password: hashPassword,
                photo: req.body.photo
            });
        await newUser.save();
        res.status(201).json(
            {
                success:true,
                message:"User Inserted!",
                data:newUser
            });
    } catch (err) {
        res.status(500).json({ seccess:false, message:"Failed to create, Try again", data:err})
    }
    }else{
        res.status(500).send("Please Fill full information");
    }
}


const loginUser = async (req, res) => {
    if( req.body.email && req.body.password ){
        const email = req.body.email

    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(403).json({ seccess:false, message:"Invalid Credentials"})
        }

        const chackPassword = await bcrypt.compare(req.body.password, user.password)
        if(!chackPassword){
            return res.status(401).json({success:false, message:"Invalid Email and Password"})
        }

        const {password, role, ...rest} = user._doc

        const token = jwt.sign(
                                {id:user._id, role:user.role}, 
                                process.env.JWT_SECRET_KEY, 
                                { expiresIn:'15d' }
                            );

        res.cookie('accessToken', token, {
            httpOnly: true,
            expires:token.expiresIn
        }).status(200).json(
                            {
                             token,
                             success:true, 
                             message:"successFully Login", 
                             data:{ ...rest },
                             role
                            });

    } catch (err) {
        res.status(500).json(
            { seccess:false, 
              message:"Failed to create, Try again", 
              data:err
            });
    }
    }else{
        res.status(500).send("Invalid Email and Password");
    }
}

module.exports = {
    registerUser,
    loginUser
}