const Review = require('../models/review');
const Tour = require('../models/tour.js')

const createReview = async(req, res) => {

    const tourId = req.params.tourId;
    const newReview =new Review({ ... req.body })

    try {
        const savedReview = await newReview.save()

        await Tour.findByIdAndUpdate(tourId, {
            $push: {reviews: savedReview._id}
        })

        res.status(200).json({ success:true, message:"Review Submittes", data:savedReview})
        
    } catch (err) {
        res.status(500).json({ success:false, message:"Review is failed", data:err})

    }
}



module.exports = {
    createReview
}