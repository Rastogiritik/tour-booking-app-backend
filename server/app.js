const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// connection db
const connectDb = require('./database/connection.js');


// connection server process
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin:true,
    credentials:true
}


// middlewares...
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
const tourRoutes = require('./routes/tourRoute.js');
app.use('/api/r1/tours', tourRoutes);

const userRoutes = require('./routes/userRoutes.js');
app.use('/api/r1/users', userRoutes);

const authRoutes = require('./routes/authRoutes.js')
app.use('/api/r1/auth', authRoutes);

const reviewRoutes = require('./routes/reviewsRoutes.js')
app.use('/api/r1/reviews', reviewRoutes)

const bookingRoutes = require('./routes/bookingRoutes.js')
app.use('/api/r1/booking', bookingRoutes)


// listen port...
app.listen(port, ()=>{
    connectDb();
    console.log(`server is connected on port ${port}`);
});