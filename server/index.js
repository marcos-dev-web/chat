import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config.js";
import router from "./src/routes/main.js";

const app = express();

app.use(cors());
app.use(morgan("common"));
app.use(helmet());
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`running at port ${PORT}...`);
});
