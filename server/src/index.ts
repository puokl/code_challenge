// return str
// .split(" ")
// .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
// .join(" ");

const express = require("express");
const bodyParser = require("body-parser");
const challengesRoute = require("../routes/challengesRoute");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
const app = express();
const port = 3001;

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(bodyParser.json());
app.use(challengesRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
