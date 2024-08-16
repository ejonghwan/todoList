import mongoose from 'mongoose';

const { Types } = mongoose.Schema;

/* 
 달력은 프로젝트마다 있는거고 
 날짜값은 개개인마다도 있어야함 
 개개인마다 깃허브 잔디처럼 얼마나 했는지 나눠야함 

 디비구조: 
     유저에 ? 
     플젝에 ?
     
     클릭시 달력은 어차피 write아이디 값 받아서 넘어가니깐 상관없음.
     달력 표기할 때 writes 필드에 아래추가하면 될거같고 

     잔디는 배열로 ? 아님 아래 날짜로 ? 
     
     writes: [{글 objectId, 유저 objectId, 날짜}]
     잔디: ["22.11.15","22.11.16", "22.11.17", "22.11.18", "22.11.19", "22.11.20", "22.11.21"]


    위에꺼 완료 


    221116 이거해야됨
    1. 프로젝트 탈퇴
    2. 프로젝트 강퇴 
    3. 방장이 프로젝트 없애려할 때 유저가 있으면 삭제 못하고 유저가 없어야 가능하게
    4. 탈퇴할때도 마찬가지 3

*/


// 데이터 타입은 days: ["2022, 11, 15"] 형식으로 저장
// 달력&잔디 표시는 프로젝트 안에 개개인마다 있음. 

const ProjectSchema = new mongoose.Schema(
    {
        constructorUser: {
            _id: { type: Types.ObjectId, required: true, index: true, ref: 'user'},
            rank: { type: String, required: true, default: 'a'},
            days: [{ 
                date: { type: String }, 
                count: { type: Number, default: 0, },
            }], //days로 달력/잔디 같이씀
        },
        instanceUser: [{
            _id: { type: Types.ObjectId, required: true, index: true, ref: 'user'},
            rank: { type: String, required: true, default: 'e'},
            days: [{ 
                date: { type: String }, 
                count: { type: Number, default: 0, },
            }], //days로 달력/잔디 같이씀
        },],
        userCount: { type: Number, required: true, default: 0, },
        title: { type: String, required: true, },
        content: { type: String, required: true, },
        writes: [{ type: Types.ObjectId, ref: 'write' }],
        projectPublic: { type: Boolean, required: true, default: true, },
        categorys: [{
            _id: { type: Types.ObjectId, ref: 'category' },
            categoryName: { type: String, ref: 'category' }
        }],
        // projectImages: [{ 
        //     _id: { type: Types.ObjectId, ref: 'image' }, 
        //     key: { type: String, required: true } 
        // }],
        projectImages:{ type: Number, default: 0 },
        joinUser: [{
            _id: { type: Types.ObjectId, ref: 'user', required: true, index: true, },
            state: { type: Boolean, required: true, default: false },
        }],
        promise: { start: { type: String, default: new Date(), }, end: { type: String }, projectLevel: { type: String, default: "0" } }, 
        // 레벨은 easy <- 0: 제한없음 1 2 3 -> hard 
        likeUser: [{ type: Types.ObjectId, ref: 'user' }],
        likeCount: { type: Number, required: true, default: 0, },
    },
    { timestamps: true }
)




const Project = mongoose.model("project", ProjectSchema)
export default Project;