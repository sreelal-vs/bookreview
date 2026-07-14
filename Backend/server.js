const express = require("express");
const app = require("./app");
const dotenv = require("dotenv");

const mongoose = require("mongoose")

dotenv.config();
const port = process.env._PORT;
const db_url = process.env.DB_URL;

async function dbconnect() {
    try {
        await mongoose.connect(process.env.db_url)
        console.log("Database connected")

    } catch (error) {
        console.log("Database connection failed")
    }
}
 dbconnect();

app.listen(port, () => {
    console.log(`server successfully running on port ${port}`);

})