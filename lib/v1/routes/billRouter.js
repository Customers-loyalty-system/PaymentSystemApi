var express = require("express");
var router = express.Router();

const { store, remove } = require("../controllers/billController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { amountValdation, billNumberValdation } = require("../services/validationService");

router.post("/", isAuthenticated, amountValdation, store);
router.delete("/", isAuthenticated, billNumberValdation ,remove);

module.exports = router;
