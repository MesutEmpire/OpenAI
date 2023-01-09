import {Request,Response,NextFunction,Application} from 'express'
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./Router/router");
require('dotenv').config()

const app:Application = express();
//middlewares
app.use(
  cors({
    origin: true,
  })
);
app.use((req:Request, res:Response, next:NextFunction) => {
  console.log(req.method + "------------>" + req.url);

  next(); // pass the request and response objects on to the next middleware function or route handler in the chain.
});

//Router
app.use("/open-ai/api", router);

//listening to PORT
app.listen(process.env.PORT, () => {
  console.log(`Listening to PORT: ${process.env.PORT}`);
});
