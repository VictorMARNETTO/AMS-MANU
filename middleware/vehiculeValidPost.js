module.exports = (req, res, next) => {
    if (!req.files) {
        return res.redirect('/admin-pannel')
    }
    // console.log("je suis le middleware");
    next()
}