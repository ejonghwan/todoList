import express from 'express';
import { auth } from '../middleware/auth.js' ;

// model 
import Write from '../models/write.js';
import User from '../models/users.js';
import Comment from '../models/comment.js';

const router = express.Router();


//@ path    GET /api/comment
//@ doc     댓글 가져오기
//@ access  private
router.get('/', auth, async (req, res) => {
    try {
        const commnet = await Comment.find();
        res.status(200).json(commnet);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});


//@ path    GET /api/comment/my/:userId/:page
//@ doc     댓글 가져오기 (내 댓글만)
//@ access  private
router.get('/my/:userId/:page', auth, async (req, res) => {
    try {
        const { userId, page } = req.params;
        const p = parseInt(page);
        const commnets = await Comment.find({"user._id": userId}).populate([{ path: "writeId", select: "_id title project", populate: { path: "project._id", select: "_id title projectImages" } }]).sort({ createdAt: -1 }).skip(p * 10).limit(10);
        res.status(200).json(commnets);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});



//@ path    POST /api/comment
//@ doc     댓글 생성
//@ access  private
router.post('/', auth, async (req, res) => { 
    try {
        // get data: user, content, writeId, 
        const { user, content, writeId } = req.body;
        const comment = await new Comment(req.body).populate({ path: "user._id", select: 'id name profileImage createdAt' });
        comment.save();

        await Promise.all([
            User.findByIdAndUpdate(user._id, { $push: { comments: comment._id } }, { new: true }).exec(),
            Write.findByIdAndUpdate(writeId, { $push: { comments: comment._id }, $inc: { commentCount: 1 } }, { new: true }).exec()
        ]);
        res.status(201).json(comment);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});


//@ path    PATCH /api/comment/edit/:commentId
//@ doc     댓글 수정
//@ access  private
router.patch('/edit/:commentId', auth,  async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const putData = {};

        if(content) putData.content = content;

        const comment = await Comment.findByIdAndUpdate(commentId, { ...putData, modified: true }, { new: true }).exec();
        res.status(201).json(comment);

    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});


//@ path    DELETE /api/comment
//@ doc     댓글 삭제
//@ access  private
router.delete('/', auth, async (req, res) => {
    try {
        const { userId, writeId, commentId } = req.body;
        const [comment, user, write] = await Promise.all([
            Comment.findByIdAndDelete(commentId, { new: true }).exec(),
            User.findByIdAndUpdate(userId, { $pull: { comments: commentId } }, { new: true }).exec(),
            Write.findByIdAndUpdate(writeId, { $pull: { comments: commentId }, $inc: { commentCount: -1 } }, { new: true }).exec(),
        ])
        res.status(201).json({ commentId });

    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});



//@ path    PATCH /api/comment/like
//@ doc     좋아요 업
//@ access  private
router.patch('/like', auth, async (req, res) => {
    try {
        const { userId, commentId } = req.body;
        const likeUser = await Comment.find({_id: commentId}).select("likes");
        for(let i = 0; i < likeUser[0].likes.length; i++) {
            if(likeUser[0].likes[i].equals(userId)) {
                return res.status(400).json({ message: "이미 좋아요를 추가했습니다." });
            }; 
        };

        const [ comment ] = await Promise.all([
            Comment.findByIdAndUpdate(commentId, { $push: {likes: userId }, $inc: { likeCount: 1 } }, { new: true }),
        ]);
        res.status(201).json({ userId, commentId });
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});



//@ path    PATCH /api/comment/unlike
//@ doc     좋아요 취소 
//@ access  private
router.patch('/unlike', auth, async (req, res) => {
    try {
        const { userId, commentId } = req.body;
        const [ comment ] = await Promise.all([
            Comment.findByIdAndUpdate(commentId, { $pull: {likes: userId }, $inc: { likeCount: -1 } }, { new: true }),
        ]);
        res.status(201).json({ userId, commentId });
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});

export default router;