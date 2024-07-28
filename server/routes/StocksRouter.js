const express = require("express");
const Stocks = require("../models/Stocks");
const router = express.Router();

function getCurrentDate() {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  return `${day}/${month}/${year}`;
}

function getCurrentDay() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const dayIndex = currentDate.getDay();
  return daysOfWeek[dayIndex]; 
}

router.post("/", async (req, res) => {
  const data = req.body;
  const date = getCurrentDate();
  const day = getCurrentDay();
  data.date = date;
  data.day = day;

  try {
    const Item = new Stocks(data);
    await Item.save();
    console.log(Item);
    res.status(201).json(Item);
  } catch (err) {
    res.status(400).send("Invalid input data");
  }
});

router.get("/", async (req, res) => {
  try {
    const stocks = await Stocks.find({});
    res.status(200).json(stocks);
  } catch (err) {
    console.log(err);
  }
});

router.get("/details/:itemId", async (req, res) => {
  try {
    const id = req.params.itemId;
    const item = await Stocks.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (err) {
    console.error("Error fetching stock details:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:itemId", async (req, res) => {
  try {
    await Stocks.findByIdAndDelete(req.params.itemId);
    const materials = await Stocks.find({});
    res.status(204).json({ Status: "Item deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:itemId", async (req, res) => {
    try{
        const name = req.body.name
        const qty = req.body.qty
        const id = req.params.itemId
        if(qty === "" || name === ""){
          return res.status(404).json("Input can't be empty")
        }
        const item = await Stocks.findById(id)
        item.name = name
        item.qty = qty
        await item.save()
        res.status(201).json(item);

    }catch(err){
        console.log(err)
    }
})

router.put("/update/:itemId", async (req, res) => {
  try{
      const qty = req.body.qty
      const id = req.params.itemId
      if(req.qty === "" ){
        return res.status(404).json("Input can't be empty")
      }
      const item = await Stocks.findById(id)
      item.qty = qty
      await item.save()
      const stocks = await Stocks.find({});
      res.status(201).json(stocks);

  }catch(err){
      console.log(err)
  }
})

module.exports = router;
