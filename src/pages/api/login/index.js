
import User from "../../../models/User"
import connectDB from "../../../middlewares/connectDB";
import bcrypt from "bcryptjs";
var jwt = require("jsonwebtoken")
const handler = async (req, res) => {
    if (req.method == "POST") {
        const rEmail = req.body.email;
        const rPassword = req.body.password;
        let user = await User.findOne({email: rEmail})
        console.log(user)

       if (user) {
        if (user && (await bcrypt.compare(rPassword, user.password))) {
            var token = jwt.sign({avatar: user.avatar, fullName: user.fullName, bio:user.bio, email: user.email}, process.env.NEXT_JWT_TOKEN);
            return res.status(200).json({type: "success", message: "User logged in Successfully", token: token, name: user.fullName})
            
        }
        else {
            return res.status(400).json({message: "Wrong Credientials. Please try again."})

        }
       }
        else {
            return res.status(400).json({message: "user not found"})
        }

        // return res.status(200).json({rPassword})

    }
    
    else {
        return res.status(200).json({ error: "Not Allowed" })
    }
}


export default connectDB(handler);