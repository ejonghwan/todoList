import express from 'express';

// model 
import Project from '../models/project.js';
import User from '../models/users.js';
import Category from '../models/category.js';

const router = express.Router();


/*
    api 뭐지.. 이슈 
    1. /project/:searchText/:pageNum
    2. /project/relation/:searchText/:pageNum
    이렇게 api 분리하면 두번째로 요청해도 첫번째꺼로 감
*/


//@ path    GET /api/search/project/:searchText/:pageNum
//@ doc     프로젝트, 글 검색 
//@ access  public
router.get('/project/:searchText/:pageNum', async (req, res) => {
    try {
        // front에서 보낼 때 encodeURIComponent("룰루")
        const { searchText, pageNum } = req.params;
        const page = parseInt(pageNum);
        
        const searchAllLength = await Project.find({
           $or: [
            {
                title: {
                    $regex: searchText,
                    $options: 'i',
                }, 
            }, 
            {   content: {
                    $regex: searchText,
                    $options: 'i',
                }
            }
        ]
        }).count();
        const search = await Project.find({
           $or: [
            {
                title: {
                    $regex: searchText,
                    $options: 'i',
                }, 
            }, 
            {   content: {
                    $regex: searchText,
                    $options: 'i',
                }
            }
        ]
        }).sort({ createdAt: -1 }).skip((page - 1) * 10).limit(10);

         res.status(200).json({ search, searchAllLength });
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});

//@ path    GET /api/search/relation/project/:searchText
//@ doc     프로젝트, 글 검색 연관 검색
//@ access  public
router.get('/relation/project/:searchText', async (req, res) => {
    try {
        const { searchText } = req.params;
        const search = await Project.find({
           $or: [
            {
                title: {
                    $regex: searchText,
                    $options: 'i',
                }, 
            }
        ]
        }).sort({ createdAt: -1 }).select('title').limit(10);
         res.status(200).json(search);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});


//@ path    GET /api/search/:userId
//@ doc     유저 검색 (아이디 or 이름)
//@ access  public
router.get('/user/:user', async (req, res) => {
    try {
        const { user } = req.params;

        const findUser = await User.find({
           $or: [
            {
                id: {
                    $regex: user,
                    $options: 'i',
                }, 
            }, 
            {   name: {
                    $regex: user,
                    $options: 'i',
                }
            }
        ]
        }).select('_id id profileImage name')
         res.status(200).json(findUser);

    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});


//@ path    GET /api/search/recent/load/:userId
//@ doc     이전 검색어
//@ access  public
router.get('/recent/load/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
         const userSearchData = await User.findById(userId).select("prevSearch");
         userSearchData.prevSearch = userSearchData.prevSearch.reverse().slice(0, 10);
         res.status(200).json(userSearchData);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});


//@ path    PATCH /api/search/recent/add/:userId/:searchText
//@ doc     이전 검색어 추가
//@ access  public
router.patch('/recent/add/:userId/:searchText', async (req, res) => {
    try {
        const { userId, searchText } = req.params; 
         await User.findByIdAndUpdate(userId, { $push: { prevSearch: searchText } }, { new: true }).select("prevSearch");
         res.status(201).json(searchText);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});

//@ path    PATCH /api/search/recent/delete/:userId/:searchText
//@ doc     이전 검색어 삭제
//@ access  public
router.patch('/recent/delete/:userId/:searchText', async (req, res) => {
    try {
        const { userId, searchText } = req.params; 
         await User.findByIdAndUpdate(userId, { $pull: { prevSearch: searchText } }, { new: true }).select("prevSearch");
         res.status(201).json(searchText);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});


//@ path    PATCH /api/search/recent/deleteall/:userId
//@ doc     이전 검색어 삭제
//@ access  public
router.patch('/recent/deleteall/:userId', async (req, res) => {
    try {
        const { userId } = req.params; 
         await User.findByIdAndUpdate(userId, { $unset: { prevSearch: 1 } }, { strict: false });
         res.status(201).end();
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});



//@ path    GET /api/search/category/:categoryName/:pageNum
//@ doc     카테고리 검색
//@ access  public
router.get('/category/:categoryName/:pageNum', async (req, res) => {
    try {
        // 카테고리네임 프론트에서 encodeURIComponent("호호")
        const { categoryName, pageNum } = req.params;
        const page = parseInt(pageNum);
        const category = await Category.find({ categoryName: categoryName }, ).sort({ createdAt: -1 }).skip((page - 1) * 10).limit(10).populate("projects");
        const searchTagAllLength = await Category.find({ categoryName: categoryName } ).count();

        res.status(201).json({ category, searchTagAllLength });
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});



export default router;