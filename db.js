const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/"

const connectToMongoose = () => {
    mongoose.connect(mongoURI, () => {
        console.log(`Connected to mongoo sucessfull`);
    })
}

module.exports = connectToMongoose;