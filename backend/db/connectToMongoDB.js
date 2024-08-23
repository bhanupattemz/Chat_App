import mongoose from "mongoose";

const connectToMongoDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("connected to mongodb");
    } catch (error) {
        console.log("error in connecting mongodb")    
    }
}

export default connectToMongoDB;