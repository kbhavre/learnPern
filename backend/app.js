const express = require('express');
const client = require('./db/connection.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;



app.get('/', (req, res)=>{
    res.json({message: "hello there"});
})

app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`);
})