const mongoose = require('mongoose');


const mongoURI = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.2";

const connectToMongo = async() => {
    await
    mongoose.connect(mongoURI).then(() => {
       return console.log("Connected to mongo seccessfully");
    }).catch(err => console.log(err));
}

module.exports = connectToMongo;