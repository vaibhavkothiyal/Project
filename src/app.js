const express=require('express');
const connect=require('./config/db')
const app=express();
app.use(express.json());
const {register,login}=require("./config/auth");
const axios = require('axios');

const PORT=process.env.PORT || 3444;

app.use('/userregister',register);
app.use('/userlogin',login);


app.listen(PORT, async()=>{
    connect();
    console.log("server running at port number 3444")
});