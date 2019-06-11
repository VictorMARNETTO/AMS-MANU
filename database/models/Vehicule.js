const mongoose = require('mongoose')

const vehiculeSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    createDate: {
        type: Date,
        default: new Date()
    }

})
const vehicule = mongoose.model('vehicule', vehiculeSchema)

module.exports = vehicule