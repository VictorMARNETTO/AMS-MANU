const mongoose = require('mongoose')

const vehiculeSchema = new mongoose.Schema({
    title: String,
    image: String,
    mark: String,
    model: String,
    year: String,
    energy: String,
    kilometers: String,
    gearbox: String,
    price: String,
    content: String,
    createDate: {
        type: Date,
        default: new Date()
    }

})
const vehicule = mongoose.model('vehicule', vehiculeSchema)

module.exports = vehicule