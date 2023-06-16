
import User from "../../../../models/User"
import connectDB from "../../../../middlewares/connectDB";
import bcrypt from "bcryptjs";
// var jwt = require("jsonwebtoken")
const handler = async (req, res) => {
    if (req.method == "POST") {
        const rEmail = req.body.email;
        const rPassword = req.body.password;
        let user = await User.findOne({email: rEmail, isAdmin: true})
        console.log(user)

       if (user) {
        if (user && (await bcrypt.compare(rPassword, user.password))) {
            // var token = jwt.sign({email: user.email, password: user.password}, process.env.JWT_TOKEN);
            // res.json({ token })
            return res.status(200).json({type: "success",message: "Admin logged in Successfully, Redirecting you to dashboard.."})
            
        }
        else {
            return res.status(400).json({type: "error", message: "Wrong Credientials. Please try again."})

        }
       }
        else {
            return res.status(400).json({type: "error", message: "Admin not found"})
        }

        // return res.status(200).json({rPassword})

    }
    
    else {
        return res.status(200).json({ error: "Not Allowed" })
    }
}


export default connectDB(handler);