import mongoose from 'mongoose';

const { Types } = mongoose.Schema;

const recommentSchema = new mongoose.Schema(
    {
        user: {
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: 'user'},
            name: { type: String, required: true, }  
        },
        // write: { _id: { type: Types.ObjectId, ref: 'write' } }, //글삭할때 코멘트 삭제하고 리코멘트는 어디서 삭제 ? 
        /*
            1. 글삭하면 유저모델에서 삭제해주고 
            2. 코멘트모델에서 삭제해주고 
            3. 이미지 모델에서 삭제해주고 
            4. 리코멘트에서 삭제
        */
        content: { type: String, required: true,  },
        comment: { type: Types.ObjectId, ref: 'comment' },
       
        isLive: { type: Boolean, default: false,},
        likes: [{ type: Types.ObjectId, ref: 'user' }],
        likeCount: { type: Number, required: true, default: 0, },
        modified: { type: Boolean, default: false },
        targetUser: { type: mongoose.Schema.Types.ObjectId, index: true, ref: 'user' } 
    },
    { timestamps: true }
)

const Recomment = mongoose.model("recomment", recommentSchema)
export default Recomment;


/*

delete
router.delete('/:id', auth, async(req, res) => {
    try {
        console.log(req.user)
        await Post.deleteMany({ _id: req.params.id }); //포스트에서 지워주고
        await Comment.deleteMany({ post: req.params.id }) //코멘트에서 지워주고
        await User.findByIdAndUpdate(req.user.id, { //유저에서 포스트와 코멘트 안에서의 포스트도 지워준다
            $pull: { //pull은 배열에서 빼줄때. push는 넣을때
                posts: req.params.id,
                comments: { post_id: req.params.id }
            }
        })

        const CategoryUpdate = await Category.findOneAndUpdate( //category에서 지우기
            { posts: req.params.id }, 
            { $pull: { posts: req.params.id } },
            { new: true } //new 는 업데이트를 적용시켜줌 
            )

        if(CategoryUpdate.posts.length === 0) { //해당 카테고리가 없으면 카테고리목록에서 삭제
            await Category.deleteMany({ _id: CategoryUpdate })
        }

        res.status(200).json({
            msg: '성공스'
        })

    } catch(err) {
        res.status(400).json({
            msg: err
        })
    }
})

*/