var express = require("express");
const { store, remove } = require("../controllers/billController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { amountValdation } = require("../services/validationService");
var router = express.Router();

router.post("/", isAuthenticated, amountValdation, store);
router.delete("/", isAuthenticated, remove);

module.exports = router;
