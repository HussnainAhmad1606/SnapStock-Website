import Image from "../../../../models/Image";
import connectDB from "../../../../middlewares/connectDB";
const handler = async (req, res) => {
    if (req.method == "POST") {
        let author = req.body.author;
    let imgs = await Image.find({authorName:author});
    return res.status(200).json({imgs})
}
else {
        return res.status(400).json({message: "Method not allowed"})
    }
}


export default connectDB(handler);