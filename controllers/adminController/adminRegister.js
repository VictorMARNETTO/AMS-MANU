const user = require('../../database/models/admin')

module.exports = (req, res) => {
    user.create(
        req.body, (error, user) => {
            if (error) {
                console.log(error);
                // const registerError = Object.keys(error.errors).map(key => error.errors[key].message);
                // req.flash('registerError', registerError)
                // req.flash('data', req.body)
                return res.redirect('/admin/create')
            }
console.log(user);

            res.redirect('/admin-pannel')
        }
    )
}