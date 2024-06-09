import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'


const PORT = 5000
const MONGODB = `mongodb+srv://admin:root@cluster0.imczbuu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const app = express()

app.use(express.json());
app.use('/api', router)

async function startApp() {
    try {
       await mongoose.connect(MONGODB )
        app.listen(PORT, () => console.log('server started on ' + PORT +  ' port'))
    } catch (e) {
        console.log(e)
    }
}

startApp()
