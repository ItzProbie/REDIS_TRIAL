const express = require("express");
const app = express();
const Redis = require("ioredis");
require("dotenv").config();
const redis = new Redis({
    host : process.env.REDIS_HOST,
    port : process.env.REDIS_PORT,
    password : process.env.REDIS_PASS
});


const {getProducts} = require("./productApi");


redis.on("connect" , () => {
    console.log("Redis connected Successfully");
}) 

app.get("/" , (req,res) => {
    res.send(`<h1>Server is running</h1>`)
})


app.get("/products" , async(req,res) => {

    let products = await redis.get("products");

    if(products){

        return res.json({
            products : JSON.parse(products)
        });

    }

    products = await getProducts();
    await redis.setex("products" , 30 , JSON.stringify(products) );

    return res.json({products});

})

app.listen(3000 , () => {
    console.log("Server started Successfully");
});
