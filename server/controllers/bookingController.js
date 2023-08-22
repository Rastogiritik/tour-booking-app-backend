const Booking = require('../models/booking.js')

const createBooking = async(req, res) => {
    const createBooking = new Booking(req.body);
    try {
        const saveBooking = await createBooking.save()
        res.status(201).json(
            {
                success:true,
                message:"Booking Done!",
                data:saveBooking
            }
        )
    } catch (err) {
        res.status(500).json(
            {
                success:false,
                message:"Booking Failed!",
                data:err
            }
        )
    }
}


const getBookingbyId = async(req, res) => {

    const id = req.params.id
    try {
        const getBooking = await Booking.findById(id)
        res.status(200).json(
            {
                success:true,
                message:"Successfully!",
                data:getBooking
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                success:false,
                message:"Booking Failed!",
                data:err
            }
        )
    }
}

const getAllBooking = async(req, res) => {

    const id = req.params.id
    try {
        const getAllBooking = await Booking.find()
        res.status(200).json(
            {
                success:true,
                message:"All bookings",
                data:getAllBooking
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                success:false,
                message:"Booking Failed!",
                data:err
            }
        )
    }
}


module.exports = {
    createBooking,
    getBookingbyId,
    getAllBooking
}