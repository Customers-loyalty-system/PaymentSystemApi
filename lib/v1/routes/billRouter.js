var express = require("express");
var router = express.Router();

const { store, remove } = require("../controllers/billController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { amountValdation } = require("../services/validationService");

router.post("/", isAuthenticated, amountValdation, store);
router.delete("/", isAuthenticated, remove);

module.exports = router;
