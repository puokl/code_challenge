require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
const app = express();
const port = 5000;
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(routes);
app.set("trust proxy", true);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
