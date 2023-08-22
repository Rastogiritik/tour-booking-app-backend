const Tour = require('../models/tour.js')


const registerTour = async (req, res) => {
    if(req.body.title && req.body.city  && req.body.address  && req.body.distance  && req.body.photo && req.body.desc && req.body.price  && req.body.maxGroupSize ){
    const newTour = new Tour(req.body)
    try {
        const tour = await newTour.save()

        res.status(201).json({
            seccess:true, 
            message:"Tour Inserted!",
            data:tour
        })
    } catch (err) {
        res.status(401).json({ seccess:false, message:"Failed to create, Try again", data:err})
    }
  }else
  {
    res.status(401).send("Please Fill full information");
  }
}


const updateTour = async (req, res) => {
    if(req.body.title && req.body.city  && req.body.address  && req.body.distance  && req.body.photo && req.body.desc && req.body.price  && req.body.maxGroupSize ){
    const id = req.params.id
    try {
        const updateTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true})
        res.status(200).json(
            {
                seccess:true, 
                message:"Tour Updated!",
                data:updateTour
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



const deleteTour = async (req, res) => {

    const id = req.params.id
    try {
        const deleteTour = await Tour.findByIdAndDelete(id)
        res.status(200).json(
            {
                seccess:true, 
                message:"Tour deleted!",
                data:deleteTour
            }
        )
    } catch (err) {
        res.status(402).json({ seccess:false, message:"Failed to delete, Try again"})

    }

}


const getSingleTour = async (req, res) => {

    const id = req.params.id
    try {
        const getSingleTour = await Tour.findById(id).populate("reviews")
        res.status(200).json(
            {
                seccess:true, 
                message:"Tour find!",
                data:getSingleTour
            }
        )
    } catch (err) {
        res.status(402).json({ seccess:false, message:"Failed to get, Try again"})
   
    }

}



const getAllTours = async (req, res) => {

    // for pagination
    const page = parseInt(req.query.page)
    try {
        const getTours = await Tour.find({})
                            .populate("reviews")
                            .skip(page * 8)
                            .limit(8);
        res.status(200).json(
            {
                seccess:true, 
                count:getTours.length,
                message:"Tour find!",
                data:getTours
            }
        )
    } catch (err) {
        res.status(402).json({ seccess:false, message:"Failed to get, Try again", data:err})

    }

}


const searchTours = async (req, res) => {

    try {
        const searchTours = await Tour.find(
            {
                "$or":[
                    { "title": {$regex:req.params.key,} },
                    { "city": {$regex:req.params.key} },
                    { "address": {$regex:req.params.key} },
                    { "desc": {$regex:req.params.key} }
                ]
            }
        ).populate("reviews")
        if (!searchTours) {
            res.status(400).json(
                {
                    success:false,
                    message:"Tour is not Find!",
                }
            )
        } else {
            res.status(200).json(
                {
                    success:true,
                    message:"Tour Find!",
                    data:searchTours
                }
            )
        }
        
    } catch (err) {
        res.status(402).json({ seccess:false, message:"Failed to get, Try again", data:err})

    }

}


const getFeaturedTour  = async (req, res) => {
    try {
        const tours = await Tour.find({ featured: true }).populate("reviews").limit(8);
        // console.log(tours)
        res.status(200).json(
            {
                seccess:true, 
                message:"Tour find!",
                data:tours
            }
        );
    } catch (err) {
        res.status(402).json({ seccess:false, message:"Failed to get, Try again", data:err})
    }
}


const getAllToursCounts = async (req, res) => {

    
    try {
        const getCount = await Tour.estimatedDocumentCount()
        res.status(200).json(
            {
                seccess:true, 
                message:"successfully count",
                data:getCount
            }
        )
    } catch (err) {
        res.status(402).json({ seccess:false, message:"Failed to get, Try again"})

    }

}



module.exports = {
    registerTour,
    updateTour,
    deleteTour,
    getSingleTour,
    getAllTours,
    searchTours,
    getFeaturedTour,
    getAllToursCounts
}