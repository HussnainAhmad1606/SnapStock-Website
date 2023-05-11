import Category from "../../../../models/Category";
import connectDB from "../../../../middlewares/connectDB";
const handler = async (req, res) => {
    let cat = await Category.find({});
    return res.status(200).json({cat})
}


export default connectDB(handler);