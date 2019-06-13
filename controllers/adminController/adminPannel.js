const vehicule = require('../../database/models/Vehicule');


module.exports = (req, res,) => {
    vehicule.find((err, vehicule) => {
        if (!err) {
            res.render('admin/admin-pannel', {
                posts: vehicule
            })
        } else {
            res.send(err)
        }
    })
}