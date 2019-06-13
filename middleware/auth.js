const admin = require('../database/models/admin')

module.exports = (req, res, next) => {
    // connecte toi a la base de donnee 
    admin.findById(req.session.adminId, (error, admin) => {
        if (error || !admin) {
            return res.redirect('/admin')
        } 
        next()
    })
    //verifie utilisateur

    //si il est dans la base de données

    //sinon redirige le 
}