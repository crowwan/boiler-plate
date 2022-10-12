const express = require('express');
const app = express();
const port = 5000;
const { User } = require('./models/User');

const mongoose = require('mongoose');
const config = require('./config/key');
mongoose.connect(config.mongoURI,{}).then(()=>console.log('mongodb connected'))
.catch((err)=>console.log(err));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/',(req,res)=>res.send('hello world!'));
app.post('/register',(req,res)=>{
  const user = new User(req.body);

  user.save((err, userInfo)=>{
    if(err) return res.json({ success: false, err });
    return res.status(200).json({
      success:true
    })
  });
});

app.listen(port,()=>console.log(`example app listening on ${port}`));