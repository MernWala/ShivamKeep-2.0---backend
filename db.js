const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://shivamkumarkashyap12:V68UP9uQcGnct5Ky@cluster0.nm9p0ov.mongodb.net/?retryWrites=true&w=majority"

const connectToMongoose = () => {
    mongoose.connect(mongoURI, () => {
        console.log(`Connected to mongoo sucessfull`);
    })
}

module.exports = connectToMongoose;