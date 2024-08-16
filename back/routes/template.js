import express from 'express';
import mongoose from 'mongoose';
import { auth } from '../middleware/auth.js' ;

// model 
import Project from '../models/project.js';
import User from '../models/users.js';
import Category from '../models/category.js';

const router = express.Router();





//@ path    GET /api/temp/docs
//@ doc     api docs
//@ access  public
router.get('/docs', async (req, res) => {
    try {
        
        const api = [
            { title: "project", items: [
                { 
                    method : 'GET', 
                    mode: 'public', 
                    api : '/api/project', 
                    desc: '원하는 값만큼 로드',
                    queryString:'page={number}', 
                    header: `
none
                    `,
                    body: `

 none

                    `, 
                    success: '201: OK',
                    frontFailure: '400: Bed Request',
                    backFailure: '500: Bed Respose',
                },
                { 
                    method : 'GET', 
                    mode: 'public', 
                    api : '/api/project', 
                    desc: '원하는 값만큼 로드',
                    queryString:'page={number}', 
                    header: `
# X-access-token : 인증토큰입니다. 암호화하여 보내야합니다.
# X-refresh-token : 인증토큰 만료 시 발급되는 리프레시 토큰입니다. (web cookie에 저장)
                    `,
                    body: `
{
    "constructorUser": { "_id": "6471f38fd20357b64ec124c9" }, 
    "instanceUser":[], 
    "title":"잔디 테스트", 
    "content":"test project content", 
    "projectPublic":"false",
    "categorys": [
        {"categoryName": "테테11"},
        {"categoryName": "테테22"}
    ],
    "joinUser": [{ "_id": "640976509e564ae2dc71e4d8", "state": true }, { "_id": "636afeff7d63060fe3b583af", "state": false }]
}
                    `, 
                    success: '201: OK',
                    frontFailure: '400: Bed Request',
                    backFailure: '500: Bed Respose',
                },
               
               
            ] }
        ]
        // data라는 이름으로 전달
        // ejs 파일에서는 data[1].a 와 같은 형식으로 사용
        res.render('../views/apiDocs', { 'data' : api }, (err ,html) => {
            if (err) console.log(err);
            res.end(html) // 응답 종료
        })




    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})




//@ path    GET /api/temp/error
//@ doc     api docs
//@ access  public
router.get('/error', async (req, res) => {
    try {
        
        res.render('../views/error', { 'errorMessage': 'zzzz' })




    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})








export default router;