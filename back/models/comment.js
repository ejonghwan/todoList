import mongoose from 'mongoose';

const { Types } = mongoose.Schema;

const CommentSchema = new mongoose.Schema(
    {
        user: {
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: 'user'},
            name: { type: String, required: true, }  
        },
        writeId: { type: Types.ObjectId, ref: 'write' },
        content: { type: String, required: true,  },
        recomments: [{ type: Types.ObjectId, ref: 'recomment' }],
        recommentCount: { type: Number, required: true, default: 0, },
        isLive: { type: Boolean, default: false,},
        likes: [{ type: Types.ObjectId, ref: 'user' }],
        likeCount: { type: Number, required: true, default: 0, },
        modified: { type: Boolean, default: false }
        
    },
    { timestamps: true }
)

const Comment = mongoose.model("comment", CommentSchema);
export default Comment;