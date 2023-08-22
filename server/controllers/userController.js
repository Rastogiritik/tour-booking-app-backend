const User = require('../models/user.js')

// const registerUser = async (req, res) => {
//     if( req.body.username && req.body.email  && req.body.password ){
//     const newUser = new User(req.body)
//     try {
//         const user = await newUser.save()

//         res.status(201).json({
//             seccess:true, 
//             message:"user Inserted!",
//             data:user
//         })
//     } catch (err) {
//         res.status(401).json({ seccess:false, message:"Failed to create, Try again", data:err})
//     }
//   }else
//   {
//     res.status(401).send("Please Fill full information");
//   }
// }


const updateUser = async (req, res) => {
    if(req.body.username && req.body.email  && req.body.password ){
    const id = req.params.id
    try {
        const updateUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true})
        res.status(200).json(
            {
                seccess:true, 
                message:"User Updated!",
                data:updateUser
            }
        )
        
    } catch (err) {
        res.status(402).json({ seccess:false, message:"Failed to update, Try again"})

    }
}else
{
  res.status(401).send("Please Fill full information");
}

}



const deleteUser = async (req, res) => {

    const id = req.params.id
    try {
        const deleteUser = await User.findByIdAndDelete(id)
        res.status(200).json(
            {
                seccess:true, 
                message:"User deleted!",
                data:deleteUser
            }
        )
    } catch (err) {
        res.status(402).json({ seccess:false, message:"Failed to delete, Try again"})

    }

}


const getSingleUser = async (req, res) => {

    const id = req.params.id
    try {
        const getSingleUser = await User.findById(id)
        res.status(200).json(
            {
                seccess:true, 
                message:"User find!",
                data:getSingleUser
            }
        )
    } catch (err) {
        res.status(402).json({ seccess:false, message:"Failed to get, Try again"})
   
    }

}



const getAllUsers = async (req, res) => {

    try {
        const getUsers = await User.find({})
        res.status(200).json(
            {
                seccess:true, 
                message:"User find!",
                data:getUsers
            }
        )
    } catch (err) {
        res.status(402).json({ seccess:false, message:"Failed to get, Try again"})

    }

}


module.exports = {
    // registerUser,
    updateUser,
    deleteUser,
    getSingleUser,
    getAllUsers,
}
