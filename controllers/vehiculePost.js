const post = require('../database/models/Vehicule')

const path = require('path')
module.exports = (req, res) => {
    // console.log(req.files);
    const { image } = req.files
    const uploadFile = path.resolve(__dirname, '..', 'public/vehicule', image.name);
    image.mv(uploadFile, (error) => {
        post.create({
            ...req.body,
            image: `/vehicule/${image.name}`
        },
            (error, post) => {
                res.redirect("/admin-pannel")
            })
        // console.log(req.body);

    })
    

}