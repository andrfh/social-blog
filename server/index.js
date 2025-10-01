import express from 'express'
import mongoose from 'mongoose';
import router from './router.js';
import fileUpload from 'express-fileupload';
import config from '../server/config.js'
import cors from 'cors'

const PORT = 5000;

const DB_URL = `mongodb+srv://${config.username}:${config.password}@cluster0.sadhvpo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)

async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, ()=>{console.log("SERVER STRARTING on " + PORT)})
    } catch (e) {
        console.log(e);
    }
}

startApp()
