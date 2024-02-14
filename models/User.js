// Import 'model' and 'Schema' from mongoose
const { model, Schema } = require('mongoose');
// Import 'hash' and 'compare' from bcrypt
const { hash, compare } = require('bcrypt') 
// Create the userSchema with the following criteria

/**
* Define the username, email and password fields
  - Validation for username
    • required
    • unique
    • minLength of 2
  - Validation for email
    • required
    • unique
    • must be a valid email string
  - Validation for password
    • required
    • minLength of 6

  

* Use the userSchema.methods property to create a custom instance method called 'validatePass' that takes a form password and compares it to the user's hashed password to return a boolean true if they match

* Create the 'User' model variable using the model function from mongoose

* Export the model
*/

const userSchema = new Schema({
  username:{
    type:String,
    required:[true, 'You must enter a username'],
    unique:true,
    minLength:[2, 'Your username must be at least 2 characters.']
  },
  email:{
    type:String,
    required:[true, 'You must enter an email address.'],
    unique:true,
    validate:{
      validator(val){
        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ig.test(val)
      }
    }
  },
  password:{
    type:String, 
    required:[true, 'You must enter a password'],
    minLength:[6, 'Your password must be at least 6 characters.']
    
  },
  mumbles: [{
    type: Schema.Types.ObjectId,
    ref: 'Mumble'
  }]
})

userSchema.pre('save', async function(next){
  if(this.isNew || this.isModified('password')){
    this.password = await hash(this.password, 10)
  }

  next();
})

userSchema.methods.validatePass = async function(formPassword){
  const is_valid = await compare(formPassword, this.password);
  return is_valid
}

userSchema.set('toJSON', {
  transform: (_, user) => {
    delete user.password;
    delete user.__v;
    return user;
  }
});

const User = model('User', userSchema);

module.exports = User;