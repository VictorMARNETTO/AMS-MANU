const admin = require('../database/models/admin')

module.exports = (req, res, next) => {
    if (req.session.adminId) {
        return res.redirect('/admin-pannel')
    }
    next()
}