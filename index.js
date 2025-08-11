const express = require('express')
const {connectDBToMongoDB} = require('./connect');
const urlRoute= require('./routes/url')
const URL = require('./models/url');
const app = express()
const PORT = 8001

connectDBToMongoDB('mongodb://localhost:27017/shorturl').then(() => {
    console.log(" mongodb connected");
});
app.use(express.json());

app.use('/url', urlRoute);
app.get('/:shortID', async (req,res)=>{
  const shortID =req.params.shortID;
  const entry = await URL.findOneAndUpdate( {
    shortUrl: shortID
  }
  ,{$push :{visithistory: {timestamp:Date.now()} }},{new: true}
      );
      
      res.redirect(entry.longUrl);
    });

app.get('/analytics', async (req, res) => {
  const analyticsData = await URL.find({});
  res.json(analyticsData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`)
})
