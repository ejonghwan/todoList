import express from 'express';

import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import ejs from "ejs";
import path from 'path';



// router
import templateRoutes from './routes/template.js';
import imagesRoutes from './routes/images.js';
import usersRoutes from './routes/users.js';
import emailRoutes from './routes/email.js';
import projectRoutes from './routes/project.js';
import writeRoutes from './routes/write.js';
import commentRoutes from './routes/comment.js';
import recommentRoutes from './routes/recomment.js';
import searchRoutes from './routes/search.js';






const app = express();
const PORT = 8080;
const __dirname = path.resolve();
dotenv.config()
//http://localhost:5000/uploads/ae791f20-ca35-4e95-919b-655d94791127.jpeg 이거 접근됨...이거 없음 접근안됨
app.use('/uploads', express.static('uploads')) 
app.use(cors({
    origin: [process.env.DOMAIN, 'https://web-hobbyist-front-euegqv2bln64g6o5.sel5.cloudtype.app'],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');





mongoose.connect(process.env.MONGO_URI, {}).then(() => {
    try {
        console.log('mongodb connect');
        app.use('/api/temp', templateRoutes);
        app.use('/api/images', imagesRoutes);
        app.use('/api/users', usersRoutes);
        app.use('/api/auth', emailRoutes);
        app.use('/api/project', projectRoutes);
        app.use('/api/write', writeRoutes);
        app.use('/api/comment', commentRoutes);
        app.use('/api/recomment', recommentRoutes);
        app.use('/api/search', searchRoutes);
        app.listen(PORT, () => console.log('express server listening port ' + PORT));

    } catch(err) {
        console.error(err)
    }
})

