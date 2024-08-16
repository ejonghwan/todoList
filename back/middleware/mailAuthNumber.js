import nodeMailer from 'nodemailer';
import ejs from 'ejs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

import path from 'path'
import { fileURLToPath } from 'url';
import { mailOpt, sendMail } from '../utils/util_emailAuth.js'

// model
import User from '../models/users.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(); 

dotenv.config()


// 가입 + 로그인  인증번호 발송
export const mailAuthNumber = async (req, res, next) => {
    try {
        const authCode = Math.random().toString().substring(2, 8);
        const { email } = req.body;
        const user = await User.findOne({ email: email })
        if(!email || typeof email !== 'string') return res.status(400).json({ message: '이메일을 제대로 입력해주세요' });
        if(user) {return res.status(400).json({ message: '이미 가입된 이메일입니다.' })}


        let mailTemplate = null;
        await ejs.renderFile(`${__dirname}/template/authNumberMail.ejs`, {authCode : authCode}, (err, data) => {
            if(err) {return console.error('ejs render error', err)}
            if(data) { mailTemplate = data;}
        })

        const mailOption = mailOpt(req.body.email, '인증메일 입니다.', mailTemplate);
        sendMail(mailOption)

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(authCode, salt, (err, hash) => {
                req.authCode = hash;
                next();
            })
        })

    } catch(err) {
        console.error(err)
    }
}



// 가입 + 비로그인  인증번호 발송
export const nonLoginAuthNumber = async (req, res, next) => {
    try {
        const authCode = Math.random().toString().substring(2, 8);
        const { name, email } = req.body;
        if(!name || typeof name !== 'string') return res.status(400).json({ message: '이름이 없어요 ' });
        if(!email || typeof email !== 'string') return res.status(400).json({ message: '이메일이 없어요' });

        const user = await User.findOne({ email: email })
        if(!user || user.name !== name) {return res.status(400).json({ message: '정보가 잘못되었습니다' })}
        
        let mailTemplate = null;
        await ejs.renderFile(`${__dirname}/template/authNumberMail.ejs`, {authCode : authCode}, (err, data) => {
            if(err) {return console.error('ejs render error', err)}
            if(data) { mailTemplate = data;}
        })

        const mailOption = mailOpt(req.body.email, '인증메일 입니다.', mailTemplate);
        sendMail(mailOption)

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(authCode, salt, (err, hash) => {
                req.authCode = hash;
                req._id = user._id;
                next();
            })
        })
        
        
    } catch(err) {
        console.error(err)
        res.status(400).json({ message: err.message }) 
    }
}



