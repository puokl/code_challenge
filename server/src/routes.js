const express = require("express");
const router = express.Router();
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { cleanJestOutput } = require("./utils/textCleaner");

router.get("/healthcheck", (req, res) => {
  res.send("Server is running!");
});

router.post("/submit", (req, res) => {
  const { code, challengeName } = req.body;

  const challengeDir = path.join(__dirname, "../challenges", challengeName);

  // Ensure the directory exists
  fs.mkdirSync(challengeDir, { recursive: true });
  // Append the module.exports line to the user's code
  const codeToSave = `${code}\nmodule.exports = ${challengeName};`;
  // Save the user's code with the module.exports line to the solution.js file
  fs.writeFileSync(path.join(challengeDir, "solution.js"), codeToSave);

  const testFilePath = path.join(challengeDir, `${challengeName}.test.js`);

  // Run the Jest tests
  exec(`npx jest ${testFilePath}`, (err, stdout, stderr) => {
    console.log("stderr", stderr);
    if (err) {
      const cleanedOutput = cleanJestOutput(stderr.toString());
      return res.status(500).json({ error: cleanedOutput });
    }
    if (stderr) {
      res.status(200).json({ stdout, stderr });
    } else {
      res.status(500).json({ error: "Internal Server Error No Stderr" });
    }
  });
});

module.exports = router;
