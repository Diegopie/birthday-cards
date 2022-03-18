const mongoose = require('mongoose');

async function db() {
    try {
        mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/diana-bday', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Successfully Connected To DB');
    } catch (error) {
        console.log('Error Connecting to DB');
        console.log(error);
    }
}

module.exports = db;