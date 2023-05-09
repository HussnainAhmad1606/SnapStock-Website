
import User from "../../models/User"
import connectDB from "../../middlewares/connectDB";

const handler = async (req, res) => {
    if (req.method == "POST") {
        const rEmail = req.body.email;
        let user = await User.findOne({email: rEmail})
        if (user) {
            return res.status(200).json({ message: "Exist" })
        }
        else {
            return res.status(200).json({ message: "Not Exist" })
        }
    }
    else {
        return res.status(200).json({ error: "Not Allowed" })
    }
}


export default connectDB(handler);