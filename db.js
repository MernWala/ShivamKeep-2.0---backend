const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/"

const connectToMongoose = () => {
    mongoose.connect(mongoURI, () => {
        console.log(`Connected to mongoo sucessfull`);
    })
}

module.exports = connectToMongoose;