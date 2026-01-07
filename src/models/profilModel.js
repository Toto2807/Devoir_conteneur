const mongoose = require('mongoose')

const profile = new mongoose.Schema({
    userID: {
        type: Number,
        required: true,
        unique: true
    },
    preferences: {
        type: [String],
        default: []
    },
    history: [
        {
            book: String,
            rate: Number,
            comment: String
        }
    ]
},{timestamps: true})

module.exports = mongoose.model('Profil',profile)