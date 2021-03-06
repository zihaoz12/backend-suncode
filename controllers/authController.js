const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

//get all users - for admin
router.get('/', async(req, res) => {
  const AllUsers = await User.find({});
  res.json({
    user:AllUsers,
  })
})

//get one user
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
});

//create account
router.post('/', async(req, res) => {
  console.log('signup post request 1 :', req.body);
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  console.log('how about here????');
  const hashedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
console.log('but not herer?');
  const name = req.body.name;

  const UserDbEntry = {};
        UserDbEntry.username  = username;
        UserDbEntry.email     = email;
        UserDbEntry.password  = hashedPassword;
        UserDbEntry.name      = name;

  console.log('before promises?');

  try {
    console.log('in sideof try 2: ', req.session);
    // console.log('userdb', UserDbEntry);
    const user = await User.create(UserDbEntry);
    // console.log('2', user);
    req.session.logged = true;
    req.session.username = req.body.username;
    req.session.userId = user._id;
    // console.log('3', req.session); // userid is saved..
    res.json({
      status: 200,
      data: 'register successful',
      userId: user._id,
      username: req.body.username
    })
  }catch(err){
    console.log('here?');
    res.send(err)
  }
});



router.put('/:id', async(req, res) => {
  try{
    // console.log('1', req.body);
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    // console.log('2');
    const modifyProfile = {};
          modifyProfile.password = hashedPassword;
          modifyProfile.username = req.body.username;
          modifyProfile.email = req.body.email;
    // console.log('modifiyProfile', modifyProfile);
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
});

//delete account
router.delete('/:id', async(req, res) => {
  try{
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    res.json({
      status: 200,
      data: deletedUser
    })
  }catch(err){
    res.send(err)
  }
});



//**********logIn/logout********************//

router.post('/login', async(req, res) => {
  try{
    console.log('1?', req.body);
    // const foundUser = await User.findOne({username: req.body.username})
    const foundUser = await User.findOne({username: req.body.username})
    // .catch((err) => console.log('caught it'));
  console.log('foundUser', foundUser);
    // const foundUser = await User.findOne({email: req.body.email})
    console.log('2?', foundUser);
    if(foundUser){
      const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);
      // console.log("passwordMatches", (bcrypt.compareSync(req.body.password, foundUser.password)));
      // if(bcrypt.compareSync(req.body.password, foundUser.password)){
      console.log('3');
      if(passwordMatches){
        req.session.message = '';
        req.session.logged = true;
        req.session.username = foundUser.username;
        // console.log('foundUser.username', foundUser.username);
        console.log('what is foundUser._id?', foundUser._id);//it works...
        req.session.userId = foundUser._id;
        console.log('req.session.userId in login', req.session);//it is working...
        res.json({
          status:200,
          data: 'login successful',
          userId: foundUser._id,
          username: foundUser.username
        })
        // console.log("how about here? req.session?", req.session);
      }else{
        req.session.message = 'username or password is not correct'
        res.status(401).json({
          status: 401,
          data: 'login unsuccessful1'
        })
      }
    }else{
      req.session.message = 'username or password is incorrect';
      res.json({
        status: 401,
        data: 'login unsuccessful2 : username or password is incorrect',
      })
    }
  }catch(err){
    console.log('catch err');
    res.send(err)
  }
});


//logout get??
router.get('/logout', (req, res) => {
  console.log('hi?');
  req.session.destroy((err) => {
    if(err){
      console.log('i am error?');
      res.send(err);
    }else{
      console.log('logout is successful');
      res.json({
        status: 200,
        data: 'logout successful'
      })
    }
  })
});



module.exports = router

// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const User = require('../models/user');
//
// router.get('/', async(req, res) => {
//   const AllUsers = await User.find({});
//   res.json({
//     user:AllUsers,
//   })
// })
//
// router.post('/', async(req, res) => {
//   const username = req.body.username;
//   const email = req.body.email;
//   const password = req.body.password;
//   const hashedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//   const UserDbEntry = {};
//         UserDbEntry.username  = username;
//         UserDbEntry.email     = email;
//         UserDbEntry.password  = hashedPassword;
//
//   try {
//     const user = await User.create(UserDbEntry);
//
//     req.session.logged = true;
//     req.session.username = req.body.username;
//     req.session.userId = user._id;
//
//     res.json({
//       status: 200,
//       data: 'register successful',
//       userId: user._id,
//       username: req.body.username
//     })
//   }catch(err){
//     res.send(err)
//   }
// })
//
//
// router.post('/login', async(req, res) => {
//   try{
//     // const foundUser = await User.findOne({username: req.body.username})
//     const foundUser = await User.findOne({username: req.body.username})
//     // const foundUser = await User.findOne({email: req.body.email})
//
//     if(foundUser){
//
//       const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);
//       console.log("passwordMatches", (bcrypt.compareSync(req.body.password, foundUser.password)));
//       // if(bcrypt.compareSync(req.body.password, foundUser.password)){
//       if(passwordMatches){
//         req.session.message = '';
//         req.session.logged = true;
//         req.session.username = foundUser.username;
//         // console.log('foundUser.username', foundUser.username);
//         req.session.userId = foundUser._id
//         console.log('req.session in login', req.session);
//         res.json({
//           status:200,
//           data: 'login successful',
//           userId: foundUser._id,
//           username: foundUser.username
//         })
//         console.log("here?");
//       }else{
//         req.session.message = 'username or password is not correct'
//         res.json({
//           status: 401,
//           data: 'login unsuccessful1'
//         })
//       }
//     }else{
//       req.session.message = 'username or password is incorrect';
//       res.json({
//         status: 401,
//         data: 'login unsuccessful2',
//       })
//     }
//   }catch(err){
//     res.send(err)
//   }
// })
//
// router.get('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if(err){
//       res.send(err);
//     }else{
//       res.json({
//         status: 200,
//         data: 'logout successful'
//       })
//     }
//   })
// })
//
//
// router.get('/info/:id', async(req, res) => {
//   try{
//     const foundUser = await User.findById(req.params.id)
//     res.json({
//       status: 200,
//       data: foundUser
//     })
//   }catch(err){
//     res.send(err)
//   }
// })
//
// router.put('/info/:id', async(req, res) => {
//   try{
//     const modifyProfile = {};
//     const password = req.body.password;
//     const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
//     modifyProfile.password = hashedPassword;
//     modifyProfile.username = req.body.username;
//     modifyProfile.email    = req.body.email;
//
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, modifyProfile, {new: true})
//     res.json({
//       status: 200,
//       data: 'user is updated',
//       updatedUser: updatedUser
//     })
//   }catch(err){
//     res.json(err)
//   }
// })
//
// module.exports = router
