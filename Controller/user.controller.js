var UserService = require('../Services/user.services');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

exports.test = async (req,res ) => {
  res.status(200).json({
    message:"Service Working"
  });
}

exports.createUser = async (req, res) => {
  
    let user = await UserService.getOneByEmail({ email: req.body.email });
    console.log("user",user);
    if (user) return res.status(400).send("User already registered.");
  
    user = await UserService.createUser({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        country:req.body.country
    });
  
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message:"User created Success"
    });
};

exports.signIn = async (req,res) => {

  console.log("someone trying to connect..");
  
  console.log(req.body);

  let user = await UserService.getOneByEmail({ email: req.body.email });

  console.log("user",user);

  if (!user) { 
   return res.status(400).send("Invalid Email") 
  };
  
  const hash = user.password;

  bcrypt.compare(req.body.password, hash, function(err, result) {
    
    if(result){
      
      const token = jwt.sign(
        {
          name:user.fname,
          email:user.email,
          userId:user._id
        },
        config.get('myprivatekey')
        ,
        {
          expiresIn:"1h"
        }
      );
      console.log("login success "+token)
      
      res.header("x-auth-token", token).status(200).json({
        message:"login Successfuly...!!!",
        token:token,
        Userdata:{
          name:user.name,
          email:user.email,
          userId:user._id
        }
      });

    } else {
      res.status(400).json({
        message:"Wrong password",
      })
    }
  })
};