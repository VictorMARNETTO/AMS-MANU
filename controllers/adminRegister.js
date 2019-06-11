const user = require('../database/models/admin')

module.exports = (req, res) => {
    user.create(
        req.body, (error, user) => {
            // console.log(error);
            if (error) {
                const registerError = Object.keys(error.errors).map(key => error.errors[key].message);
                req.flash('registerError', registerError)
                req.flash('data', req.body)
                return res.redirect('/admin/create')
            }
            res.redirect('/')
        }
    )
}