const express = require('express');
const router = express.Router();
const bcrypt  = require('bcryptjs');

const User = require('../models/user');
const House  = require('../models/house');


router.get('/allhouses', async(req, res) => {
  console.log('0');
    const allHouses = await House.find({});
    res.json({
      data : allHouses
    })
});


//one house
router.get('/house/:id', async(req, res) => {
  console.log('what is req.params.id? ===>', req.params.id);
  try{
    const foundUser = await User.findById(req.params.id);
    const foundHouse = await House.findOne({userId: req.params.id})
    res.json({
      status: 200,
      data: foundHouse
    })
  }catch(err){
    console.log('fail????');
    res.send(err)
  }
});


//bring one user information
router.get('/:id', async(req, res) => {
  try{
    const foundUser = await User.findById(req.params.id)
    res.json({
      status: 200,
      data: foundUser
    })
  }catch(err){
    res.send(err)
  }
})

//edit user account
router.put('/:id', async(req, res) => {
  try{
    const modifyProfile = {};
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    modifyProfile.password = hashedPassword;
    modifyProfile.username = req.body.username;
    modifyProfile.email = req.body.email;

    const updatedUser = await User.findByIdAndUpdate(req.params.id, modifyProfile, {new:true})
    res.json({
      status: 200,
      data: 'user is updated',
      updatedUser: updatedUser
    })


  }catch(err){
    console.log('put is err');
    res.json(err)
  }
})

//delete user account
router.delete('/delete/:id', async(req, res) => {
  try{
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    res.json({
      status: 200,
      data: deletedUser
    })
  }catch(err){
    res.send(err)
  }
})


module.exports = router
