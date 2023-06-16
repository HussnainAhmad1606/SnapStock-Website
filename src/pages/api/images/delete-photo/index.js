import Image from "../../../../models/Image";
import connectDB from "../../../../middlewares/connectDB";
const handler = async (req, res) => {
    if (req.method == "POST") {
        let slug = req.body.slug;
    let img = await Image.findOneAndRemove({slug:slug});
    return res.status(200).json({type:"success", message:"Image deleted successfully"})
}
else {
        return res.status(400).json({message: "Method not allowed"})
    }
}


export default connectDB(handler);