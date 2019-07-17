const express = require('express');
const router  = express.Router();
const path = require('path');
const House  = require('../models/house');
const Photo  = require('../models/photo');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    // cb(null, file.fieldname + '-' + Date.now + path.extname(file.originalname));
    cb(null, new Date().toISOString() + file.originalname);
  }
});


const upload = multer({
  storage: storage,
  limits: {fileSize: 1000000}, // 1 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
}).single('myImage'); // name: 'picture' in form
//multiple .array


function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}

router.post('/', (req, res) => {
  console.log('tell why....', req.session);
  upload(req, res, async(err) => {
    if (err) {
      res.json(err);
    }else{
      if (req.file == undefined) { // typeof req.file === 'undefined', check if there is actually an image uploaded
        res.json(err);
      }else{
        // console.log('are you coming here?');
        console.log('why req.seesion.userId is not appearing here???!!',req.session);
        const createdPhoto = await Photo.create({
          pic1: `uploads/${req.file.filename}`,
        });

        createdPhoto.authorId = req.session.userId; // attach userId
        createdPhoto.authorname = req.session.username;
        createdPhoto.testing = 'testing'
        console.log('how about here?', createdPhoto);
        // console.log(createdPhoto);
        createdPhoto.save((err, savedPhoto) => {
          res.json({
            msg: 'file uploaded',
            file: `uploads/${req.file.filename}`,
            newPhoto: savedPhoto,
          });
        });
      }
    }
  });
});



// // get all photos
// router.get('/', (req, res) => {
//
//   Photo.find({}, (err, allUsers) => {
//     if (err) res.json(err);
//     res.json(allUsers);
//   });
// });
//
// // get one photo
// router.get('/:id', (req, res) => {
//   Photo.findById(req.params.id, (err, foundUser) => {
//     if (err) res.json(err);
//     res.json(foundUser);
//   });
// });


//all photos
router.get('/', async(req, res) => {
  try{
    const allphotos = await Photo.find();
    res.json({
      status: 200,
      data: allphotos
    })
  }catch(err){
      res.send(err)
  }
});

//get one photo - show
router.get('/:id', async(req, res) => {
  try{
    const foundPhoto = await Photo.findById(req.params.id)
    res.json({
      status: 200,
      data: foundPhoto
    })
  }catch(err){
    res.send(err)
  }
});


// // photo UPDATE
// router.put('/:id', (req, res) => {
//   Post.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUser) => {
//     if (err) res.json(err);
//     res.json(updatedUser);
//   });
// });
//
// // Photo DESTROY
// router.delete('/:id', async (req, res) => {
//   Photo.findByIdAndRemove(req.params.id, (err, deletedUser) => {
//     if (err) res.json(err);
//     // res.json(deletedUser);
//     res.json({success: `User was removed.`})
//   });
// });


//Phto edit
router.put('/:id', async(req, res) => {
  try{
    const updatedPhoto = await Photo.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json({
      status: 200,
      data: updatedPhoto
    })
  }catch(err){
    res.send(err)
  }
});


//photo delete
router.delete('/:id', async(req, res) => {
  try{
    const deletedPhoto = await Photo.findByIdAndRemove(req.params.id);
    res.json({
      status: 200,
      data: deletedPhoto
    })
  }catch(err){
    res.send(err)
  }
});







module.exports = router;
