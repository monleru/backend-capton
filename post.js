const mongoose = require('mongoose')

const Post = new mongoose.Schema({
    key: {type: String, required: true},
    name: {type: String, required: true},
    reward: {type: String, required: true},
    contract: {type: String, required: true},
    activites: {type: [], required: true},
    rating: {type: Number, required: true}
})

module.exports = mongoose.model('Post', Post)
