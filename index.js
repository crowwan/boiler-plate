const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://crowwan:crowlast1215@boilerplate.lugyz4e.mongodb.net/?retryWrites=true&w=majority',{}).then(()=>console.log('mongodb connected'))
.catch((err)=>console.log(err));


app.get('/',(req,res)=>res.send('hello world!'));

app.listen(port,()=>console.log(`example app listening on ${port}`));