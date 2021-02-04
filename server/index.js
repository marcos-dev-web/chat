import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
})

console.log(process.env.NODE_ENV)

const app = express();













const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`running at port ${PORT}...`)
})