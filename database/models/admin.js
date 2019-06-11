const bcrypt = require('bcrypt')
    , mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,"l'email est obligatoire"]
    },
    
    password: {
        type: String,
        required: [true, 'le mot de passe est obligatoire']
    },
    
})
adminSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(admin.password, 10, (error, encrypted) => {
        admin.password = encrypted
        next()
    })
})
module.exports = mongoose.model('admin', adminSchema)