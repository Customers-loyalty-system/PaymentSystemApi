const models = require("../models");
const { Op } = require("sequelize");


const store = async (req, res, next) => {
  const httpResponse = {
    success: true,
    data: null,
    messages: [],
  };
  const amount = +req.body.amount;
  if (amount <= 0) {
    res.status(407);
    httpResponse.success = false;
    httpResponse.messages.push("Amount should be more than 0");
    return res.send(httpResponse);
  }
  var d = new Date();
  var t = new Date().getTime();
  var randomnum = Math.floor(Math.random() * (1000 - 500000)) + 1000;
  randomnum = d.getFullYear() + d.getMonth() + 1 + d.getDate() + randomnum;
  billReference = `${randomnum + t} - ${-1 * (randomnum + d.getMonth() + 1)}`;
  // added the iniate at date of the token to the random number we are already created
  billNumber = randomnum + req.user.iat;
  const bill = await models.Bill.create({
    companyId: req.user.id,
    billNumber,
    billReference,
    amount,
  });
  if (bill) {
    httpResponse.messages.push("A new bill has been added successfully");
  }
  res.status(201);
  return res.send(httpResponse);
};

const remove = async (req, res) => {
  const httpResponse = {
    success: true,
    data: null,
    messages: [],
  };
  const billNumber = req.query.billNumber;
  if (!billNumber) {
    httpResponse.success = false;
    httpResponse.messages.push("Please provid the bill number");
  }
  const bill = await models.Bill.findOne({
    where: {
      billNumber,
      // Check this one add recently
      companyId : { 
        [Op.eq] : req.user.id
      }
    },
  });
  if (!bill) {
    httpResponse.success = false;
    httpResponse.messages.push("This bill is not exist");
  } else {
    bill.destroy();
    console.log(bill)
    delete bill.dataValues.deletedAt
    httpResponse.data = bill
    httpResponse.messages.push('bill has been removed! ')
  }
  return res.send(httpResponse);
};

module.exports = {
  store,
  remove,
};