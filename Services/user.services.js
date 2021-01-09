var {User} = require('../Model/user.model');
const bcrypt = require("bcrypt");


exports.getAllUsers = async function () {
    
    const users = await User.find();
    return users;
    
}

exports.createUser = async (query) => {
    const user = new User(query);
    console.log(user);
    user.password = await bcrypt.hash(user.password, 10);
    console.log(user);
    return await user.save();
};

exports.getOneByEmail = async function (query) {
    
    const users = await User.findOne(query);
    return users;
   
}