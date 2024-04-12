const { spawn } = require("child_process");
const express = require("express");

const app = express();

app.get("/api/random-bytes", (req, res) => {
  const child = spawn("./entro_exec");

  child.stdout.on("data", (data) => {
    res.json(data.toString().trim());
  });

  child.stderr.on("data", (data) => {
    console.error("Error from child process:", data.toString());
    res.status(500).send("Failed to generate random bytes");
  });

  child.on("close", (code) => {
    if (code !== 0) {
      console.error("Child process exited with code:", code);
      res.status(500).send("Failed to generate random bytes");
    }
  });
});

app.listen(3000, () => console.log("Server listening on port 3000"));
