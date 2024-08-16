import mongoose from 'mongoose';

const { Types } = mongoose.Schema;

const CategorySchema = new mongoose.Schema({
        categoryName: { type: String, default: '미분류' },
        projects: [{ type: Types.ObjectId, ref: 'project' }]
    })


export default mongoose.model("category", CategorySchema)