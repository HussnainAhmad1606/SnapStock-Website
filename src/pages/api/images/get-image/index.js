import Image from "../../../../models/Image";
import connectDB from "../../../../middlewares/connectDB";
const handler = async (req, res) => {
    if (req.method == "POST") {
        let slug = req.body.slug;
    let img = await Image.find({slug:slug});
    let relatedImgs = await Image.find({category: img[0].category});
    return res.status(200).json({img, relatedImgs})
}
else {
        return res.status(400).json({message: "Method not allowed"})
    }
}


export default connectDB(handler);