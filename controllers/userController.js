const Users = require("../models/userModel");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const userController = {
  registerUser: async (req, res) => {
    try {
      //extracting the data from the req body
      const { username, email, password } = req.body;
      
      //checking if the email exists
      const user = await Users.findOne({ email: email });
      
      //if email exists already
      if (user) {
        return res.status(400).json({ msg: "email already exists" });
      }
      
      //hashing the password
      const passwordHash=await bcrypt.hash(password,10)
      
      //if the user doesnt exist, create one
      const newUser=new Users({
        username,
        email,
        password:passwordHash
      })
      await newUser.save()

      res.json({ msg: "signup success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const {email,password}=req.body
      const user=await Users.findOne({email})
      if(!user){
        return res.status(400).json({msg:"user doesn't exist"})
      }
      
      const isMatch=await bcrypt.compare(password,user.password)
      if(!isMatch){
        return res.status(400).json({msg:"invalid password"})
      }
      
      //if login succeed then create a token
      const payload={id:user._id,name:user.username}
      const token=jwt.sign(payload,process.env.TOKEN_SECRET,{expiresIn:"1d"})
      
      res.json({token})
      res.json({ msg: "login a user" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  verifiedToken:(req,res)=>{
    try{
      const token=req.header("Authorization")
      if(!token) return res.send(false)
      
      jwt.verify(token,process.env.TOKEN_SECRET,async (err,verified)=>{
        if(err) return res.send(false)
        
        const user=await Users.findById(verified.id)
        if(!user) return res.send(false)
        return res.send(true)
      })
    }catch(err){
      return res.status(500).json({msg:err.message})
    }
  }
};

module.exports = userController;
