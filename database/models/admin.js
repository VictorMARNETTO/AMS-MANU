const bcrypt = require('bcrypt')
    , mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({

    name:{
        type: String,
        required:[true, "Le nom est obligatoire."],
        unique: [true, "ce nom est déjà pris."]
    },

    email: {
        type: String,
        required: [true,"L'email est obligatoire."],
        unique: [true, "Un compte est déjà associé à cet email."]
    },
    
    password: {
        type: String,
        required: [true, 'Le mot de passe est obligatoire.']
    },
    
})
adminSchema.pre('save', function (next) {
    const admin = this
    bcrypt.hash(admin.password, 10, (error, encrypted) => {
        admin.password = encrypted
        next()
    })
})
module.exports = mongoose.model('admin', adminSchema)