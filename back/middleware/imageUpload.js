import multer from 'multer';
import { v4 } from 'uuid';
import mime from 'mime-types'; //file type 지정

// 아래로 수정 const upload = multer({ dest: "uploads" }) //dest: 업로드할 경로. 자동으로 생성됨
const storage = multer.diskStorage({ //파일의 고유아이디 저장을 컨트롤 하기 위해 
    destination: (req, file, cb) => cb(null, "./uploads"),
    filename: (req, file, cb) => {cb(null, `${v4()}.${mime.extension(file.mimetype)}`);}
})
/*
req: request 정보 
file: 파일정보 
cb: 콜백
destionation: 어디에 저장할지 
filename: 어떤 이름으로 저장할지
*/


const upload = multer({ 
    storage, 
    fileFilter: (req, file, cb) => {
        if(['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype)) {
            return cb(null, true)
        } else {
            return cb(new Error('invalid file type'), true) //처음: 오류, 두번째 불리언값 true=저장.
        };
       
    },
    limits: {
        fileSize: 1024 * 1024 * 5, //1024 * 1024 = 1mb 
    },
})


export default upload;