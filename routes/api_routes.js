// Create a 'router' using express
// Import the User model
const router = require('express').Router();

const { User, Mumble } = require('../models')
/*
Create a POST route to register a new user and send the new user object back to the client
  - If mongoose throws an 11000 error(unique/already created), send back a json response with a 'User already exists' message
  - For any other mongoose errors(err.errors), send back a json response with a 'messages' property that is an array of all mongoose errors that were thrown
*/
router.post('/register', async(req, res) => {
  console.log(req.body)
  try {
    const user = await User.create(req.body);

    res.json(user);
  } catch (err) {

    if (err.code === 11000) {
      return res.json({
        error: 403,
        message: "User address already exists",
      });
    }
    return res.json({
      error: 403,
      messages: Object.values(err.errors).map((val) => val.message),
    });
    // console.log(err)
  }
})

// get user by id
router.get('/users/:id', async(req, res) => {
  const user_id = req.params.id;

  // const user = await User.findById(user_id).populate(['mumbles', {
  //   path:'Mumble',
  //   att
  // }]);
  const user = await User.findById(user_id).populate('mumbles');
  res.json(user);
})


router.post('/mumble', async(req ,res) => {
  const { body: {text, user_id }} = req;

  const mumble = await Mumble.create({
    text,
    user:user_id
  });

  const updatedUser = await User.findByIdAndUpdate(user_id, {
    $push:{
      mumbles: mumble._id
    }
  }, {new:true});

  res.json(updatedUser);
})

router.get('/mumbles', async(req, res) => {
  const mumbles = await Mumble.find().populate('user', 'username email');

  res.json(mumbles);
})

// router.get('/users', async(req, res) => {
//   const pageNumber = 0;

//   const users = await User.find().skip(20).limit(10).sort({
//     email: 1
//   });

//   res.json(users);

// })


// Export the router object

module.exports = router;