

const mongoose =require('mongoose')
async function connectDBToMongoDB(url) {
    return mongoose.connect(url);
}
 module.exports = {connectDBToMongoDB};