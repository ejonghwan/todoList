import express from 'express';
import { auth } from '../middleware/auth.js' ;
import moment from 'moment';

// model 
import Write from '../models/write.js';
import Project from '../models/project.js';
import User from '../models/users.js';
import Comment from '../models/comment.js';
import Recomment from '../models/recomment.js';

const router = express.Router();


//@ path    GET /api/write
//@ doc     로드 인증글
//@ access  private
router.get('/', auth, async (req, res) => {
    try {
        const { page } = req.query;
        let p = parseInt(page);
        const write = await Write.find().skip(p * 6).limit(6);

        res.status(200).json(write);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});


//@ path    GET /api/write/:writeId
//@ doc     로드 인증글 (상세)
//@ access  private
router.get('/:writeId', auth, async (req, res) => {
    try {
        const { writeId } = req.params;
        const write = await Write.findById(writeId).populate([
            { path: 'user._id', select: 'id profileImage email name createdAt' },
            // { path: 'likes._id', select: 'id profileImage email name createdAt' }, //이거값 확인
            { 
                path: 'comments', 
                select: '_id user content likes likeCount modified recomments recommentCount createdAt updatedAt', 
                populate: [
                    { path: "user._id", select: 'id name profileImage createdAt' },  
                    { path: 'recomments', 
                        populate: [
                            { path: "user._id", select: 'id name profileImage createdAt' }, 
                            { path: "targetUser", select: 'id name profileImage createdAt' }
                        ] 
                    } 
                ]}, // 이거 값 확인
            { path: "project._id", select: 'title' },
        ]);
        res.status(200).json(write);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});


//@ path    GET /api/write/my/:userId/:number
//@ doc     로드 인증글 (내 글만)
//@ access  private
router.get('/my/:userId/:page', auth, async (req, res) => {
    try {
        const { userId, page } = req.params;
        const p = parseInt(page);
        const write = await Write.find({"user._id": userId}).populate([
            { path: 'user._id', select: 'id profileImage email name createdAt' },
            // { path: 'likes._id', select: 'id profileImage email name createdAt' }, //이거값 확인
            { 
                path: 'comments', 
                select: '_id user content likes likeCount modified recomments recommentCount createdAt updatedAt', 
                populate: [
                    { path: "user._id", select: 'id name profileImage createdAt' },  
                    { path: 'recomments', 
                        populate: [
                            { path: "user._id", select: 'id name profileImage createdAt' }, 
                            { path: "targetUser", select: 'id name profileImage createdAt' }
                        ] 
                    } 
                ]}, // 이거 값 확인
            { path: "project._id", select: 'title' },
        ]).sort({ createdAt: -1 }).skip(p * 10).limit(10);
        res.status(200).json(write);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});



//@ path    POST /api/write
//@ doc     생성 인증글
//@ access  private 
router.post('/', auth, async (req, res) => { 
    try {
        const { user, project, title, content, writePublic } = req.body;
        const write = await new Write(req.body).populate([
            { path: "user._id", select: 'id name profileImage' },
            { path: "project._id", select: 'title content constructorUser instanceUser' }
        ]);

        write.save();

        const nowDate = moment().add(9, 'h').format("YYYY/MM/DD");
        console.log('date??', nowDate, moment().format())
        console.log('date22??', nowDate, moment().add(9, 'h').format())
         
        // const nowDate = date.format("YYYY/MM/DD");
        const isConstructor = await Project.findOne( { $and: [{ _id: project._id }, { "constructorUser._id": user._id } ] }, );
        const isConstructorDate = await Project.findOne( { $and: [{ _id: project._id }, { "constructorUser._id": user._id }, { "constructorUser.days": {$elemMatch : { date: nowDate } } } ] }, );

        // #### constructor ####  - 230621 테스트완료 (생성자 + 인스유저에 모두 있을 경우도 완료)
        // 오늘 쓴 인증글이 있다면 count만 ++
          if(isConstructor && isConstructorDate) {
            for(let h = 0; h < isConstructorDate.constructorUser.days.length; h++) {
                if(isConstructorDate.constructorUser.days[h].date === nowDate) {
                    isConstructorDate.constructorUser.days[h].count++
                    await isConstructorDate.save();
                };
            };
        };
        // 오늘 쓴 인증글이 없다면 필드 date count 추가
        if(isConstructor && !isConstructorDate) {
            await Project.findByIdAndUpdate(project._id, 
                { $push: { "constructorUser.days": { date: nowDate} } },
                { new: true }
            );
        };
        // #### constructor ####
   


        // 이게 모든 인스턴스 유저 days 파인드가 아니라 ..해당 플젝의 해당 유저의 days를 찾아야됨. $and 사용
        const isInstance = await Project.findOne({ $and: [
            { _id: project._id }, 
            { instanceUser: { $elemMatch: { $and: [ { _id: user._id, days: { $elemMatch: { date: nowDate } } } ] } } }, 
        ] });


        // #### instance ####
        // 오늘 쓴 인증글이 있다면 count만 ++
        if(!isConstructor && isInstance) {
            for(let i = 0; i < isInstance.instanceUser.length; i++) {
                if(isInstance.instanceUser[i]._id.equals(user._id) ) {
                    for(let h = 0; h < isInstance.instanceUser[i].days.length; h++) {
                        if(isInstance.instanceUser[i].days[h].date === nowDate) {
                            isInstance.instanceUser[i].days[h].count++
                            await isInstance.save();
                        };
                    };
                };
            };
        };
        // 오늘 쓴 인증글이 없다면 필드 date count 추가
        if(!isConstructor && !isInstance) {
            await Project.findByIdAndUpdate(project._id, 
                { $push: { "instanceUser.$[ele].days": { date: nowDate} } },
                { arrayFilters: [{"ele._id": user._id}], new: true }
            );
        };
        // #### instance ####
        
        await Promise.all([
            User.updateOne({_id: user._id}, { $push: { writes: write._id } }, { new: true }),
            Project.updateOne({_id: project._id}, { $push: { writes: write._id } }, { new: true }),
        ]);
        res.status(201).json({ write: write });
        
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});


//@ path    PATCH /api/write/edit/:writeId
//@ doc     수정 인증글
//@ access  private
router.patch('/edit/:writeId', auth, async (req, res) => {
    try {
        const { writeId } = req.params;
        const { title, content, writePublic, prevImagefilename } = req.body;
 
        let putData = {};
        if(title) putData.title = title;
        if(content) putData.content = content;
        if(writePublic) putData.writePublic = writePublic;

        if(prevImagefilename) {
            await Write.findByIdAndUpdate(writeId, {$pull: { writeImages: { key: prevImagefilename } }}, { new: true });
        };

        const write = await Write.findByIdAndUpdate(writeId, putData, { new: true });
        res.status(201).json(write);

    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});


//@ path    DELETE /api/write
//@ doc     삭제 인증글
//@ access  private
router.delete('/', auth, async (req, res) => {
    try {
        const { userId, writeId, projectId } = req.body;
        const write = await Write.findById(writeId);

        const deleteWriteDate = moment(write.createdAt);
        const nowDate = deleteWriteDate.add(9, 'h').format("YYYY/MM/DD");
        // const nowDate = deleteWriteDate.format("YYYY/MM/DD");
       
        const isConstructor = await Project.findOne( { $and: [{ _id: projectId }, { "constructorUser._id": userId } ] }, );
        const isConstructorDate = await Project.findOne( { $and: [{ _id: projectId }, { "constructorUser._id": userId }, { "constructorUser.days": {$elemMatch : { date: nowDate } } } ] }, );
    
        // 생성 시 0, 추가할때마다 +1
        // 삭제 시 카운트가 0인경우 -1로.. -1이면 추가했던걸 삭제했다는 뜻

        // #### constructor ####  - 
        // 삭제할땐 글 카운트 -- 
          if(isConstructor && isConstructorDate) {
            for(let h = 0; h < isConstructorDate.constructorUser.days.length; h++) {
                if(isConstructorDate.constructorUser.days[h].date === nowDate) {
                    isConstructorDate.constructorUser.days[h].count--;
                    await isConstructorDate.save();
                };
            };
        };

        
        // #### constructor ####
        // 여기해야됨. 인스턴스유저는 배열이라 배열로 찾아야함.

        // 이게 모든 인스턴스 유저 days 파인드가 아니라 ..해당 플젝의 해당 유저의 days를 찾아야됨. $and 사용
        const isInstance = await Project.findOne({ $and: [
            { _id: projectId }, 
            { instanceUser: { $elemMatch: { $and: [ { _id: userId, days: { $elemMatch: { date: nowDate } } } ] } } }, 
        ] });

        // #### instance ####
        // 인스턴스 유저도 -- 
        if(!isConstructor && isInstance) {
            for(let i = 0; i < isInstance.instanceUser.length; i++) {
                if(isInstance.instanceUser[i]._id.equals(userId) ) {
                    for(let h = 0; h < isInstance.instanceUser[i].days.length; h++) {
                        if(isInstance.instanceUser[i].days[h].date === nowDate) {
                            isInstance.instanceUser[i].days[h].count--;
                            await isInstance.save();
                        };
                    };
                };
            };
        };
        // #### instance ####


        // 코멘트, 리코멘트 삭제 - 테스트완료
        for(let i = 0; i < write.comments.length; i++) {
            await Recomment.remove({ comment: write.comments[i]._id }, { new: true });
        };
        for(let i = 0; i < write.comments.length; i++) {
            await Comment.findByIdAndRemove(write.comments[i], { new: true });
        };

        // 유저에 좋아요 글 삭제 - 테스트 완료
        for(let i = 0; i < write.likes.length; i++) {
            await User.findByIdAndUpdate(write.likes[i], { $pull: {likePost: writeId } }, { new: true });
        };

        // 테스트 완료
        await Promise.all([
            Write.findByIdAndRemove(writeId),
            User.updateOne({_id: userId}, { $pull: { writes: writeId } }, { new: true }),
            Project.updateOne({_id: projectId}, { $pull: {writes: writeId } }, { new: true }),
        ]);
        res.status(201).json({ projectId });
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});



//@ path    PATCH /api/write/like
//@ doc     좋아요 업
//@ access  private
router.patch('/like', auth, async (req, res) => {
    try {
        const { userId, writeId } = req.body;

        const likeUser = await Write.find({_id: writeId}).select("likes");
        for(let i = 0; i < likeUser[0].likes.length; i++) {
            if(likeUser[0].likes[i].equals(userId)) {
                return res.status(400).json({ message: "이미 좋아요를 추가했습니다." });
            };
        };

        const [ write ] = await Promise.all([
            Write.findByIdAndUpdate(writeId, { $push: {likes: [userId] }, $inc: { likeCount: 1 } }, { new: true }),
            User.updateOne({_id: userId}, { $push: {likePost: writeId } }, { new: true }),
        ]);
        res.status(201).json(userId);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});



//@ path    PATCH /api/write/unlike
//@ doc     좋아요 취소 
//@ access  private
router.patch('/unlike', auth, async (req, res) => {
    try {
        const { userId, writeId } = req.body;

        const [ write ] = await Promise.all([
            Write.findByIdAndUpdate(writeId, { $pull: {likes: userId }, $inc: { likeCount: -1 } }, { new: true }),
            User.updateOne({_id: userId}, { $pull: {likePost: writeId } }, { new: true }),
        ]);

        res.status(201).json(userId);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }; 
});





// /api/write/test
router.get('/test/:userId/:projectId', async(req, res) => {
    try {

        const { userId, projectId } = req.params;

        // const isConstructorDate = await Project.findOne( { $and: [{ _id: projectId }, { "constructorUser._id": userId }, { "constructorUser.days": {$elemMatch : { date: nowDate } } } ] }, );
        // const isInstance = await Project.findOne({ $and: [{ _id: projectId }, { "instanceUser._id": userId }, { "instanceUser.days": {$elemMatch : { date: nowDate } } } ] }) ;
        // const isInstance = await Project.findOne({ $and: [
        //     { _id: projectId }, 
        //     { instanceUser: { $elemMatch: { _id: userId } } }, 
        //     { days: { $elemMatch: { date: "2023-9-22" } } }  
        // ] }) ;


        const isInstance = await Project.findOne({ $and: [
            { _id: projectId }, 
            { instanceUser: { $elemMatch: { $and: [ { _id: userId, days: { $elemMatch: { date: "2023922" } } } ] } } }, 
        ] });
        res.json(isInstance)
    } catch(err) {
        console.log(err)
    }
})



export default router;