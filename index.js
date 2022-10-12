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

app.post('/login',(req,res)=>{
  //요청된 이메일을 데이터베이스에 있는지 찾음
  User.findOne({ email: req.body.email },(err,user)=>{
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      });
    }
    // 이메일에 대한 비밀번호가 같은지 확인한다.
    
    user.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch)
        return res.json({ loginSuccess: false, message: '비밀번호가 틀렸습니다.'})
      
      //비밀번호가 맞으면 토근 생성
      user.generateToken((err,user)=>{
        
      });
    });
  });
  
});

app.listen(port,()=>console.log(`example app listening on ${port}`));