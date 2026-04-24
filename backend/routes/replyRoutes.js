const express = require("express");
const router = express.Router();

const { generateReply } = require("../controllers/replyController");

router.post("/generate", generateReply);

module.exports = router;