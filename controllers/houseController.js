const express = require('express');
const router  = express.Router();
const House  = require('../models/house');
const User = require('../models/user');


//house list
router.get('/', async(req, res) => {
  try{
    const allhouses = await House.find();
    res.json({
      status: 200,
      data: allhouses
    })
  }catch(err){
      res.send(err)
  }
});

//report show
router.get('/:id', async(req, res) => {
  try{
    const foundHouse = await House.findById(req.params.id)
    res.json({
      status: 200,
      data: foundHouse
    })
  }catch(err){
    res.send(err)
  }
});

//create house
router.post('/', async(req, response) => {
  // console.log(`Report Create: ${req.body}`)
  console.log(req.body);

  try{
    const createdHouse = await House.create(req.body);
    console.log('session id', req.session.userId);
    createdHouse.authorId = req.session.userId;
    createdHouse.authorname = req.session.username;
    // console.log(`Created Report: ${createdReport}`);
    // console.log('createdReport=>', typeof(createdReport));
    console.log('createdHouse', createdHouse);
    createdHouse.save((err, savedHouse) => {
      response.json({
        status: 200,
        data: savedHouse,
      })
    })
    // console.log('here?');
  }catch(err){
    console.log('error????_?');
    response.send(err)
  }
});





//house edit
router.put('/:id', async(req, res) => {
  try{
    const updatedHouse = await House.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json({
      status: 200,
      data: updatedHouse
    })
  }catch(err){
    res.send(err)
  }
});


//report delete
router.delete('/:id', async(req, res) => {
  try{
    const deletedHouse = await House.findByIdAndRemove(req.params.id);
    res.json({
      status: 200,
      data: deletedHouse
    })
  }catch(err){
    res.send(err)
  }
});


module.exports = router
