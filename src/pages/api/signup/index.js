import User from "../../../models/User"
import connectDB from "../../../middlewares/connectDB";
import bcrypt from "bcryptjs";
const handler = async (req, res) => {
    if (req.method == "POST") {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        console.log(req.body)
        let user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
            isBlocked: req.body.isBlocked,
            isAdmin: req.body.isAdmin
        })
    
        await user.save();
        return res.status(200).json({message: "User created successfully" })
    }
    
    else {
        return res.status(400).json({message: "ERROR: Failed to create account" })
    }
}


export default connectDB(handler); 