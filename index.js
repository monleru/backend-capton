const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router.js')

const PORT = process.env.PORT || 5000;
const DB_URL = "mongodb+srv://nikko:MoKm3lxo6hjiSpEN@cluster0.8kzaexv.mongodb.net/?retryWrites=true&w=majority"
const app = express()
app.use(express.json())
app.use('/api', router)
app.use(morgan())
app.use(cors())
app.post('/', )
async function startApp() {
    try {
        await mongoose.connect(DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        app.listen(PORT, () => { console.log('Server has been started...'+ PORT) })
    } catch (e) {
        console.log(e)
    }
}
startApp()