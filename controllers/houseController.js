const express = require('express');
const router  = express.Router();
//*************** photo ****************
const mongoose = require('mongoose');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/uploads/');
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true)
  }else {
    cb(null, false);
  }
}
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

//*************** photo ****************


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

// //create house
// router.post('/', async(req, response) => {
//   // console.log(`Report Create: ${req.body}`)
//   console.log(req.body);
//
//   try{
//     const createdHouse = await House.create(req.body);
//     console.log('what is req.session? in house?', req.session);
//     console.log('session id in house?', req.session.userId);
//     createdHouse.authorId = req.session.userId;
//     createdHouse.authorname = req.session.username;
//     // console.log(`Created Report: ${createdReport}`);
//     // console.log('createdReport=>', typeof(createdReport));
//     console.log('createdHouse', createdHouse);
//     createdHouse.save((err, savedHouse) => {
//       response.json({
//         status: 200,
//         data: savedHouse,
//       })
//     })
//     // console.log('here?');
//   }catch(err){
//     console.log('error????_?');
//     response.send(err)
//   }
// });


router.post('/', upload.single('productImage'), (req, res, next) => {
  console.log('req.session ======>', req.session);
  console.log('path?????', req.file);
  const userId = req.session.userId
  console.log('userid from session', userId);
  const product = new House({
    _id: new mongoose.Types.ObjectId(),
    street: req.body.street,
    address: req.body.address,
    state: req.body.state,
    zipcode: req.body.zipcode,
    year: req.body.year,
    sqft: req.body.sqft,
    productImage: req.file.path,
    // productImage1: req.files[0].path,
    // productImage2: req.files[1].path,
    // productImage3: req.files[2].path,
    // productImage4: req.files[3].path,
    userId: userId
  });

  console.log('what is product', product);
  product
    .save()
    .then(result => {
      console.log('what is result?', result);
      res.status(201).json({
        message: 'handle post route',
        createdProduct: {
            _id: result._id,
            street: result.street,
            address: result.address,
            state: result.state,
            zipcode: result.zipcode,
            year: result.year,
            sqft: result.sqft,
            userId: "??",
            request: {
              type: 'GET',
              url: 'http://localhost:9000/api/v1/house/' +  result._id
            }
        }
      });
    })
    .catch(err => {
      console.log('error: post request fail');
      res.status(500).json({
        error: err
      })
    });

})


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


//house delete
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
