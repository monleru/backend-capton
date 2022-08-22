const mongoose = require('mongoose')

const Post = new mongoose.Schema({
    login: {type: String, required: true},
    password: {type: String, required: true}
})

module.exports = mongoose.model('Post', Post)
