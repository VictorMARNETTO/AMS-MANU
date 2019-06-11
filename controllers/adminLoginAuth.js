const bcrypt = require('bcrypt')
    , user = require('../database/models/admin')


module.exports = (req, res) => {
    const { email, password } = req.body;

    user.findOne({ email }, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id
                    res.redirect('/')
                }
                else {
                    res.redirect('/admin/login')
                }
            })
         } else {
             return res.redirect('/admin/login')
         }
    })
}