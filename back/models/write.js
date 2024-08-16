import mongoose from 'mongoose';

const { Types } = mongoose.Schema;

const WriteSchema = new mongoose.Schema(
    {
        user: {
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: 'user'},
            name: { type: String, required: true, }  
        },
        project: { _id: { type: Types.ObjectId, ref: 'project' } },
        title: { type: String, required: true,  },
        content: { type: String, required: true,  },
        writeImages: [{ 
            _id: { type: Types.ObjectId, ref: 'image' }, 
            key: { type: String, required: true } 
        }],
        comments: [{ type: Types.ObjectId, ref: 'comment' }],
        commentCount: { type: Number, required: true, default: 0, },
        isLive: { type: Boolean, default: false,},
        writePublic: { type: Boolean, default: false,},
        likes: [{ type: Types.ObjectId, ref: 'user' }],
        likeCount: { type: Number, required: true, default: 0, },
    },
    { timestamps: true }
);
// writeImages comments commentCount

const Write =  mongoose.model("write", WriteSchema);
export default Write;