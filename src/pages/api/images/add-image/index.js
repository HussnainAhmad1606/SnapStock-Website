import Image from "../../../../models/Image";
import connectDB from "../../../../middlewares/connectDB";
const handler = async (req, res) => {
    if (req.method == "POST") {
        let image = new Image({
            title: req.body.title,
            description: req.body.description,
            slug: req.body.slug,
            category: req.body.category,
            image: req.body.image,
            authorName: req.body.authorName,
            authorBio: req.body.authorBio,
            authorAvatar: req.body.authorAvatar,
            isAdultOrExplicit: req.body.isAdultOrExplicit
        })

        await image.save();
        return res.status(200).json({ message: "Image Added Successfully" })
    }
    
    else {
        return res.status(400).json({ message: "Not Allowed" })
    }
}


export default connectDB(handler);