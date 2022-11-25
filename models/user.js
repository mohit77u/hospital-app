const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    
},{ timestamps: true });
  
// save password in encrypted form
userSchema.pre("save", async function(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// for forgot password check user exists or not
// userSchema.statics.findByEmail = async(email) => {
//     const user = await User.findOne({ email });
//     return user;
// };

// // find By Username
// userSchema.statics.findByUsername = async(username) => {
//     const user = await User.findOne({ username });
//     return user;
// };

// find By Username
userSchema.statics.findByPhone = async(phone) => {
    const user = await User.findOne({ phone });
    return user;
};


const User = mongoose.model('users', userSchema);
module.exports = User;