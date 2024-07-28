const express = require('express')
const Users = require('../models/Users')
const router = express.Router()
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const data = req.body
    console.log(data)
    try{
        const user = new Users(data)
        await user.save()
        console.log(user)
        res.status(201).json(user)
    }
    catch(err){
        res.status(400).send("Invalid input data")
    }
})

router.get('/', async (req, res) => {
    try{
        const users = await Users.find({})
        res.status(200).json(users)
    }catch(err){
        console.log(err)
    }
})

router.post('/update/:userId', async (req, res) => {
    try{
        const user = await Users.findById(req.params.userId)
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }
        user.role = user.role === "user" ? "author" : "user";
        await user.save();
        const users = await Users.find({})
        res.status(200).json(users)
    }catch(err){
        console.log(err)
    }
})

router.delete('/:userId',  async (req, res) => {
    try{
        await Users.findByIdAndDelete(req.params.userId)
        res.status(204).json({Status:"User removed"})
    }
    catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
  }
})


router.post('/login', async (req, res, next) => {
    try {
        // Calculate the number of seconds in 30 days
        const expiresInSeconds = 30 * 24 * 60 * 60;

        const user = await Users.findOne({ number: req.body.number });
        if (!user) {
            return res.status(501).json({ Message: "No Records existed, Please Check Your Mobile Number" });
        } else {
            const token = jwt.sign(
                { user: { id: user._id, name: user.name, number: user.number, role: user.role } },
                process.env.JWT_KEY,
                { expiresIn: expiresInSeconds }
            );
            res.cookie('token', token, { 
                sameSite: 'None', 
                secure: true, 
                httpOnly: true, 
                maxAge: expiresInSeconds * 1000 // Convert seconds to milliseconds
            });
            return res.json(user);
        }
    } catch (err) {
        console.log(err);
        res.status(404).json({ Message: "Server side error" });
    }
});

const Verify = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ Message: "we need token please provide it ." })
    } else {
      jwt.verify(token,process.env.JWT_KEY,(err, decoded) => {
        if (err) {
          return res.json({ Message: "Authentication Error." });
        } else {
          req.user = decoded.user;
          next();
        }
      });
    }
  };

router.post('/verify', Verify, (req, res, next) => {
    return res.status(200).json({ Status: "Verify-Success", user: req.user });
})

router.post('/logout', Verify, (req, res) => {
    res.cookie('token',"",{expiresIn:new Date(0)})
    return res.status(200).json({ Status: "Success" });

});

function getSecondsUntilSixMonths() {
    const now = new Date();
    const sixMonthsLater = new Date(now.setMonth(now.getMonth() + 6));
    const secondsUntilSixMonths = Math.floor((sixMonthsLater.getTime() - Date.now()) / 1000);
    return secondsUntilSixMonths;
  }

module.exports = router 