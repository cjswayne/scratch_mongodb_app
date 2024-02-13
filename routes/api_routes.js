// Create a 'router' using express
// Import the User model
const router = require('express').Router();

const { User } = require('../models')
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


// Export the router object

module.exports = router;