const mongoose = require('mongoose');


const mongoURI = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.2";

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
       return console.log("Connected to mongo seccessfully");
    })
}

module.exports = connectToMongo;