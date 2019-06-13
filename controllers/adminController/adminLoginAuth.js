const bcrypt = require('bcrypt')
    , admin = require('../../database/models/admin')


module.exports = (req, res) => {
    const { email, password } = req.body;

    admin.findOne({ email }, (error, admin) => {
        if (admin) {
            bcrypt.compare(password, admin.password, (error, same) => {
                if (same) {
                    req.session.adminId = admin._id
                    res.redirect('/admin-pannel')
                }
                else {
                    res.redirect('/admin/login')
                }
            })
          } //else {
        //      return res.redirect('/admin/login')
        //  }
    })
}