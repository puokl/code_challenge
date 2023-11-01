const express = require("express");
const { NodeVM } = require("vm2");
const assert = require("assert");
const challenges = require("../data/challenges");
const { exec } = require("child_process");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/test", (req, res) => {
  res.send("Server is running!");
});
// on postman
// router.post("/submit", (req, res) => {
//   const { code } = req.body;

//   // Save the submitted code to a file
//   require("fs").writeFileSync("submission.js", code);

//   // Run the Jest tests
//   exec("npx jest capitalize.test.js", (err, stdout, stderr) => {
//     if (err) {
//       console.error(`exec error: ${err}`);
//       return res.status(500).send("Internal Server Error");
//     }

//     // Send the results back to the user
//     res.send(stdout + stderr);
//   });
// });

router.post("/submit", (req, res) => {
  const { code } = req.body;

  console.log("Received code:", code);

  // Append the module.exports line to the user's code
  const codeToSave = `${code}\nmodule.exports = capitalize;`;
  // Save the user's code with the module.exports line to a file
  fs.writeFileSync("submission.js", codeToSave);

  // Run the Jest tests
  exec("npx jest data/capitalize.test.js", (err, stdout, stderr) => {
    if (err) {
      console.error(`Exec error: ${err}`);
      console.error(stderr);
      return res.status(500).send("Internal Server Error");
    }

    console.log("Jest stdout:", stdout);
    console.log("Jest stderr:", stderr);

    res.json({ stdout, stderr });
  });
});

module.exports = router;
