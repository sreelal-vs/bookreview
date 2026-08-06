const express = require("express");
const userRoute = require("./Routes/userRoute");
const bookRoute = require("./Routes/bookRoute");
const readingstatusRoute = require("./Routes/readingstatusRoute");
const commentRoute = require("./Routes/commentRoute");
const reviewRoute = require("./Routes/reviewRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");



const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use('/Uploads',express.static("Uploads"));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/book', bookRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/readingstatus', readingstatusRoute);
app.use('/api/v1/comment', commentRoute);
app.use('/api/v1/review', reviewRoute);

module.exports = app;