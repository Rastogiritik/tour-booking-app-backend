const mongoose = require('mongoose')

// ! jub bhi connection krna to password ko encod krke likhe or ip ko allow accesses with anywhere de
mongoose.set('strictQuery', false)
const connectDb = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology : true
        })

        console.log(`MongoDB database connected`)
    } catch (err) {
        console.log(`MongoDB database connection Failed ${err}`)
    }
}

module.exports = connectDb