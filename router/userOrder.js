const express = require("express");
const router = express.Router();
const path = require("path");


router.use(express.json());

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "user.html"));
});

router.get("/asker", (req, res) => {
  res.send("Asker");
});


module.exports = router;
