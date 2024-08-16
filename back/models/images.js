import mongoose from 'mongoose';

const { Types } = mongoose.Schema;

const imageSchema = new mongoose.Schema(
    {
        user: {
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: 'user'},
            name: { type: String, required: true, }  
        },
        // user: { //이건 name 저장안되고 objectId만 저장됨.... 위에꺼랑 뭐가 나을까 ? 
        //     type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: 'user',
        //     name: { type: String, required: true, }  
        // },
        write: { _id: { type: Types.ObjectId, ref: 'write' } },
        key: { type: String, required: true },
        originalFileName: { type: String, required: true },
        // public: { type: Boolean, required: true, }
    },
    { timestamps: true }
)


export default mongoose.model("image", imageSchema)