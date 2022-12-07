const router = require('express').Router();
const User = require('../model/user');

// creating user
router.post('/Register', async(req, res)=> {
  try {
    const {firstName, lastName, username , password} = req.body;
    console.log(req.body);
    const user = await User.create({firstName, lastName, username , password});
    res.status(201).json(user);
  } catch (e) {
    let msg;
    if(e.code == 11000){
      msg = "User already exists"
    } else {
      msg = e.message;
    }
    console.log(e);
    res.status(400).json(msg)
  }
})

// login user

router.post('/Login', async(req, res)=> {
  try {
    const {username, password} = req.body;
    const user = await User.findByCredentials(username, password);
    user.status = 'online';
    await user.save();
    res.status(200).json(user);
  } catch (e) {
      res.status(400).json(e.message)
  }
})

module.exports = router