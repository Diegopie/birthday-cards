const mongoose = require('mongoose');

async function db() {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/boothang-bday-23', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully Connected To DB');
    } catch (error) {
        console.log('Error Connecting to DB');
        console.log(error);
    }
}

module.exports = db;