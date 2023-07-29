const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const AuthRouter = require('./Routes/AuthRoutes')
const port = 5000;
const cookiePareser = require('cookie-parser')
app.use(cookiePareser())


connectDatabase().catch(error => console.log(error))
async function connectDatabase(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log("database connected");
}

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    })
  );
  

// app.use(cookiePareser())
app.use(express.json());
app.use(AuthRouter);




app.listen(port, () => {
  console.log("server is live");
});
