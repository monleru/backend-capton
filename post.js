const mongoose = require('mongoose')

const Post = new mongoose.Schema({
    key: {type: String, required: true},
    reward: {type: String, required: true},
    collect: {type: String, required: true},
    activites: {type: [], required: true},
    rating: {type: String, required: true}
})

module.exports = mongoose.model('Post', Post)
