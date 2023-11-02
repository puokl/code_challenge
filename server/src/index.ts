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
const port = 3001;

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
