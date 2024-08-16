import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const mailPoster = nodeMailer.createTransport({
    service: 'Naver',
    host: 'smtp.naver.com',
    port: 587,
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD,
    },
    // 서명받지 않은 사이트의 요청도 받음
    tls: {
        rejectUnauthorized: false,
    },
  });

  
export const mailOpt = (reqUser, title, contents) => {
    const mailOptions = {
        from: process.env.MAIL_ID,
        to: reqUser,
        subject: title,
        html: contents,
    };

    return mailOptions;
};


// 메일 전송
export const sendMail = (mailOption) => {
    mailPoster.sendMail(mailOption, function(error, info) {
        if (error) {
            console.log('에러 ' + error);
        } else {
            console.log('전송 완료 ' + info.response);
            next();
        };
    });
}