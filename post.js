const mongoose = require('mongoose')

const Post = new mongoose.Schema({
    key: {type: String, required: true},
    name: {type: String, required: true},
    reward: {type: String, required: true},
    contract: {type: String, required: true},
    activites: {type: [], required: true},
    rating: {type: Number, required: true},
    logo: {type: String, required: true},
    about: {type: String, required: true},
    start: {type: Number, required: true},
    end: {type: Number, required: true},
    links: {
        telegram: {type: String, required: false},
        discord: {type: String, required: false},
        twitter: {type: String, required: false},
        website: {type: String, required: false},
    },
    eventLink: {type: String, required: true},
    rewardsPool: {type: String, required: true},
    participants: {type: String, required: true},
    aboutDiv: {type: String, required: true},
    img: {type: String, required: true},
    details: {type: String, required: true},

})

module.exports = mongoose.model('Post', Post)
