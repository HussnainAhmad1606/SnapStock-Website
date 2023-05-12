
import User from "../../models/User"
import connectDB from "../../middlewares/connectDB";
import jwt from "jsonwebtoken"
const handler = async (req, res) => {
    if (req.method == "POST") {
        const token = req.body.token;
        const data = jwt.verify(token, process.env.NEXT_JWT_TOKEN);
        console.log(data)
        if (data) {
            const returnedData = {
                fullName: data.fullName,
                email: data.email,
            }
            return res.status(200).json({message: "success", data: returnedData})
            
        }
        else {
            return res.status(400).json({message: "Verification failed"})
        }
    }
    else {
        return res.status(200).json({ error: "Not Allowed" })
    }
}


export default connectDB(handler);