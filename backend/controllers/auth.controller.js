import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signUp=async(req,res)=>{
    try {
        const {fullName,userName,email,password,confirmedPassword,gender}=req.body;
        if(password!=confirmedPassword){
            return res.status(400).json({error:"Passwords dont match"});
        }
        const user=await User.findOne({userName});

        if(user){
            return res.status(400).send("User already exist with this username");
        }
        const user1=await User.findOne({email});

        if(user1){
            return res.status(400).send("User already exist with this email");
        }
        const boyProfilePic="https://cdn-icons-png.flaticon.com/128/428/428933.png";
        const girlProfilePic="https://cdn-icons-png.flaticon.com/128/11498/11498793.png";
        const hashedPassword=await bcryptjs.hash(password,10);
        const newUser=new User({
            email,
            fullName,
            userName,
            email,
            password:hashedPassword,
            gender,
            profilePic:gender==="male"?boyProfilePic:girlProfilePic
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save();
        
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                userName:newUser.userName,
                profilePic:newUser.profilePic
            })
        }
        else{
            return res.status(400).json({error:"Invalid user details"});
        }
    } catch (error) {
        console.log("error in sign up:",error.message)
        return res.status(500).json({error:"Internal server error"});
    }
}

export const loginUser=async(req,res)=>{ 
    try {
        const {email,password}=req.body;

        const user=await User.findOne({email});

        if(!user){
            return res.status(400).send("User not found with this email")
        }
        const isPasswordCorrect=await bcryptjs.compare(password,user.password)

        if(!isPasswordCorrect){
            return res.status(400).json({error:"Invalid password"});
        }
        generateTokenAndSetCookie(user._id,res)
    
        return res.status(201).json({
            _id:user._id,
            fullName:user.fullName,
            userName:user.userName,
            profilePic:user.profilePic
        })

    } catch (error) {
        console.log("error in login:",error.message)
        return res.status(500).json({error:"Internal server error"});
    }
}
export const logoutUser=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        return res.status(200).json({message:"logout successfully"});
    } catch (error) {
        console.log("error in logout:",error.message)
        return res.status(500).json({error:"Internal server error"});
    }
}
//mongodb+srv://saikiran71021:s4Ua0c0rEEr8Rgyi@cluster0.givwc2k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0