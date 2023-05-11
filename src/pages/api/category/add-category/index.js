import Category from "../../../../models/Category";
import connectDB from "../../../../middlewares/connectDB";
const handler = async (req, res) => {
    if (req.method == "POST") {
        let cat = new Category({
            title: req.body.title,
            image: req.body.image
        })

        await cat.save();
        return res.status(200).json({ message: "Category Added Successfully" })
    }
    
    else {
        return res.status(400).json({ message: "Not Allowed" })
    }
}


export default connectDB(handler);