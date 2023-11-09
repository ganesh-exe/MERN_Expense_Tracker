const express = require("express");
const cors = require("cors"); //to allow cross origin access and Pass data
require("dotenv").config(); // to read env
const Transaction = require("./models/Transaction");
const { default: mongoose } = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json("backend running success");
});

app.get("/api/test", (req, res) => {
  res.json("test ok- get req success");
});

app.post("/api/transaction", async (req, res) => {
  //async function to use await in mongo connection
  // console.log(process.env.MONGO_URL);
  await mongoose.connect(process.env.MONGO_URL); //mongo connection is async function, so we use await
  const { name, description, datetime, price } = req.body;
  const transaction = await Transaction.create({
    name,
    description,
    datetime,
    price,
  }); //transaction is object, Transaction is model name
  res.json(transaction);
});

app.get("/api/transactions", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.listen(4000, () => {
  console.log("server running on 4000");
});
