const mongoose=require('mongoose');

const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: [{
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
},{
        timestamps:true
    }
);


const URL = mongoose.model('Url', urlSchema);

module.exports = URL;
