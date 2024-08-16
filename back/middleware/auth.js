import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import bcrypt from 'bcrypt';


// 토큰 인증 미들웨어
/*
    회원가입 시 30일 리프레시 토큰 발급 (30일 뒤 만료되면 다시 30일 발급) 
    로그인 시 acc 2시간 발급 + 리프레시 토큰 웹쿠키로 2시간 발급
    acc ref 시간 다를 경우 쿠키에 있는 ref로 인증하고 acc 다시 발급 
*/
export const auth = async (req, res, next) => {
    try {
        const accToken = req.header('X-access-token');
        if(accToken) {
            const match = jwt.verify(accToken, process.env.JWT_KEY, {ignoreExpiration: true}) 
             // decode가 있으면 acc로 인증 
            if(match && match.exp > Date.now().valueOf() / 1000) { 
                // writes comments recomments likePost 지우고 테스트
                const user = await User.findOne({ id: match.id }).select('birthday createdAt darkMode email gender id joinProjects likeProject name phoneNumber prevSearch profileImage projects  updatedAt').populate([ 
                    { path: "projects", 
                        populate: [
                            {path: "constructorUser._id", select: "name"},
                            {path: "joinUser._id", select: "name id"},
                        ] },
                    { path: "joinProjects._id" },
                    { path: 'likeProject', select: '_id title likeCount instanceUser createdAt constructorUser projectImages', populate: {path: "constructorUser._id", select: "name"} },
                ]).exec();
                req.user = { accToken, ...user._doc };
                next();

            } else {

                // 인증토큰 만료되어 리프레시 토큰으로 인증할 경우
                const getRefreshToken = req.cookies["X-refresh-token"];
                if(!getRefreshToken) return; // client에서 cookie로 리프레시토큰없으면 return
                console.log('auth /  acc 토큰 만료돼서 refresh 토큰 으로 인증하고 다시 발급');

                const refreshTokenDecode = decodeURIComponent(getRefreshToken);
                const user = await User.findOne({ id: match.id }).select('birthday createdAt darkMode email gender id joinProjects likeProject name phoneNumber prevSearch profileImage projects  updatedAt').populate([ 
                    { path: "projects", 
                        populate: [
                            {path: "constructorUser._id", select: "name"},
                            {path: "joinUser._id", select: "name id"},
                        ] },
                    { path: "joinProjects._id" },
                    { path: 'likeProject', select: '_id title likeCount instanceUser createdAt constructorUser projectImages', populate: {path: "constructorUser._id", select: "name"} },
                ]).exec();

                // db에 저장된 리프레시가 만료되었을 경우 => db토큰 새로 교체하고 acc토큰 발급
                const dbToken = jwt.verify(user.token, process.env.JWT_KEY, {ignoreExpiration: true});
                if(dbToken.exp < Date.now().valueOf() / 1000) {
                    user.token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "30 days" });
                    user.save().then(user => {
                        const acctoken = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "2h" });
                        req.user = { acctoken, ...user._doc };
                        req.reftoken = user.token,
                        next();
                    });
                };


                // 넘어온 리프레시 토큰이 참이고 만료기간이 안 지난경우 => acc토큰 새로 발급
                const refreshTokenMatch = await bcrypt.compare(user.token, refreshTokenDecode)
                if(refreshTokenMatch && dbToken.exp > Date.now().valueOf() / 1000) {
                    // 2시간짜리 토큰 재발급
                    const acctoken = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "2h" })
                    req.user = { accToken: acctoken, ...user._doc };
                    next();
                };
            };
        } else {
            return res.status(400).json({ message: "토큰 만료. 로그인 다시 해주세요" });
        }
       

    } catch(err) {
        console.log(err);
        return res.status(400).json({ message: "인증에러" });
    };
};


