import Image from "../../../../models/Image";
import connectDB from "../../../../middlewares/connectDB";
const handler = async (req, res) => {
    let img = await Image.find({});
    return res.status(200).json({img})
}


export default connectDB(handler);