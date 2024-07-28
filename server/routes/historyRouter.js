const express = require('express')
const History = require('../models/History')
const router = express.Router()

function getCurrentDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
}

function getCurrentDay() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const dayIndex = currentDate.getDay();
    return daysOfWeek[dayIndex]; 
}


router.post('/', async (req, res) => {
    const data = req.body
    console.log(data)
    try{
        const date = getCurrentDate();
        const day = getCurrentDay()
        data.date = date;
        data.day = day;
        const Item = new History(data)
        await Item.save()
        console.log(Item)
        res.status(201).json(Item)
    }
    catch(err){
        res.status(400).send("Invalid input data")
    }
})

router.get('/', async (req, res) => {
    try{
        const history = await History.find({})
        res.status(200).json(history)
    }catch(err){
        console.log(err)
    }
})

// router.post('/update/:itemId', async (req, res) => {
//     try{
//         const item = await Material.findById(req.params.itemId)
//         if (!item) {
//             return res.status(404).json({ error: 'Item not found' });
//         }
//         item.status = true
//         await item.save();
//         const materials = await Material.find({})
//         res.status(200).json(materials)
//     }catch(err){
//         console.log(err)
//     }
// })

module.exports = router 