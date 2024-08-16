import express from 'express';
import querystring from 'querystring';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { auth } from '../middleware/auth.js' ;

import { signMailAuth } from '../middleware/signMailAuth.js';
import { mailAuthNumber, nonLoginAuthNumber } from '../middleware/mailAuthNumber.js';

// model 
import User from '../models/users.js';

const router = express.Router();
dotenv.config();

// 이메일 보내는 곳


//@ path    POST /api/auth
//@ doc     회원가입 시 메일인증 보냄
//@ access  public
router.post('/', signMailAuth, async (req, res) => {
    try {
        res.status(200).json({ message: '이메일로 전송되었습니다.', email: req.body.email })
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
})


//@ path    GET /api/auth/signup
//@ doc     메일 가서 유저가 가입버튼 누르면 여기로 옴
//@ access  public
router.get('/signup', async (req, res) => {
    try {
        const { auth } = req.query;
        const match = jwt.verify(auth, process.env.JWT_KEY, {ignoreExpiration: true},) 

        // 만료시간 1시간. 지나면 실행
        if(match.exp < Date.now().valueOf() / 1000) {
            console.error('토큰시간 만료')
            return res.redirect(`${process.env.DOMAIN}/error`)
        }


        const encode = encodeURIComponent(match.email)
        const query = querystring.stringify({ valid: true, email: encode})
        // res.cookie('signup', true, { expires: new Date(Date.now() + 1000 * 60 * 15)}).redirect(`${process.env.DOMAIN}/signup?${query}`) //ejs 에 있는 a 링크에 api 이동 후 매치가 되면 쿠키를 주는데 프론트에서 크리덴탈스를 true로 줄수 없어서 넘어간 쿼리스트링 값이 트루라면 프론트에서 쿠키를 설정함.
        res.redirect(`${process.env.DOMAIN}/signup?${query}`)
        
       
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err.message })
        res.redirect(`${process.env.DOMAIN}/error`)
    }
})


//@ path    GET /api/auth/login
//@ doc     메일 로그인 요청
//@ access  public
router.get('/login', async (req, res) => {
    try {
        const { auth } = req.query;
        const match = jwt.verify(auth, process.env.JWT_KEY, {ignoreExpiration: true},) 
        if(match.exp < Date.now().valueOf() / 1000) {
            console.error('토큰시간 만료')
            return res.redirect(`${process.env.DOMAIN}/error`)
        }
        
        const user = await User.findOne({ email: match.email })
        jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "2h" }, (err, accToken) => {
            if(err) throw new Error(err)

            // token hash
            bcrypt.genSalt(10, async (err, salt) => {
                bcrypt.hash(user.token, salt,  (err, hash) => {
                    const query = querystring.stringify({ 
                        valid: true, 
                        accToken: accToken,
                    })
                    res.cookie('X-refresh-token', hash, { expires: new Date(Date.now() + 7200000), httpOnly: true });
                    res.redirect(`${process.env.DOMAIN}/?${query}`);
                })
            })
        });
        

    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
})


// 내일할거

// 1. 인증완료에 토큰 1시간 준거 만료 로직 [O] 
// 2. mailAuth를 로그인/회원가입  or  아이디찾기 비번찾기에 사용되는 메일인증이랑 분리 [0]
// 3. 이메일 수정에  이메일 인증넣기 [0]
// 4. 아이디 찾기 (개인정보, 이메일인증) 
// 5. 비번찾기  (질답, 이메일인증)


/* 인증로직 간단하게 
1. c: 인증번호 요청 
2. s: 메일로 인증번호 날림. 
      미들웨어에서 bcrypt로 암호화해서 req.body에 담아 넘김. 
      email router에서 jwt쿠폰으로 유효기간 설정 후 쿠키로 res 
3. c: 인증번호 입력 후 서버로 보낼 때 쿠키도 같이보냄 
4. s: c에서 넘어온 쿠키 유효기간 체크하고..지났으면 에러를 안지났으면 bcript로 비교 후 
*/
//@ path    POST /api/auth/member/member/number
//@ doc     가입된 + 로그인된 회원 인증번호로 메일인증
//@ access  public
router.post('/member/number', auth, mailAuthNumber, async (req, res) => {
    try {
        const { email, _id } = req.body;
        if(!email || typeof email !== 'string') return res.status(400).json({ message: 'is not email' }) 
        if(!_id) return res.status(400).json({ message: 'is not _id' }) 

        res.cookie('authCode', req.authCode, { expires: new Date(Date.now() + 180000), httpOnly: true });
        res.status(200).json({ message: '인증번호를 입력해주세요.', email})
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
})


//@ path    POST /api/auth/nonMember/number
//@ doc     가입되지않은 상태에서 인증번호로 메일인증
//@ access  public
router.post('/nonMember/number', mailAuthNumber, async (req, res) => {
    try {
        const { email, _id } = req.body;
        if(!email || typeof email !== 'string') return res.status(400).json({ message: 'is not email' }) 
        if(!_id) return res.status(400).json({ message: 'is not _id' }) 

        res.cookie('authCode', req.authCode, { expires: new Date(Date.now() + 180000), httpOnly: true });
        res.status(200).json({ message: '인증번호를 입력해주세요.', email})
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
})


//@ path    POST /api/auth/nonLoginMember/number
//@ doc     회원 + 비로그인 인증메일  
//@ access  public
router.post('/nonLoginMember/number', nonLoginAuthNumber, async (req, res) => {
    try {
        const { name, email } = req.body;
        if(!email || typeof email !== 'string') return res.status(400).json({ message: 'is not email' }) 
        if(!name) return res.status(400).json({ message: 'is not name' }) 

        res.cookie('authCode', req.authCode, { expires: new Date(Date.now() + 180000), httpOnly: true });
        res.cookie('_id', req._id, { expires: new Date(Date.now() + 180000), httpOnly: true });
        res.status(200).json({ message: '인증번호를 입력해주세요.'})
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
})







export default router;