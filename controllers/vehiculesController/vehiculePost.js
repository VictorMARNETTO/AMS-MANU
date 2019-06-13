const post = require('../../database/models/Vehicule')
const multer =require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/vehicule');
    },
    filename: (req, file, cb) =>{
        cb(null, file.fileldname + '-' + Date.now())
    }
});
const path = require('path')
module.exports = (req, res) => {
    // console.log(req.files);
    const upload = multer({image: storage}).array('image', 10);
    upload(req, res, function (err) {
        console.log(req.body);
        console.log(req.files);
    })

    // const { image } = req.files
    // const uploadFile = path.resolve(__dirname, '..', 'public/vehicule', image.name);
    // image.mv(uploadFile, (error) => {
    //     post.create({
    //         ...req.body,
    //         image: `/vehicule/${image.name}`
    //     },
    //         (error, post) => {
    //             res.redirect("/admin-pannel")
    //         })
    //     // console.log(req.body);

    // })
    

}