import User from "../models/user.model.js"

export const getUsersforSidebar=async(req,res)=>{
    try {
        const loggedInUserId=req.user._id

        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        return res.status(200).send(filteredUsers);

    } catch (error) {
        console.log("error in getUserForSideBar:",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}