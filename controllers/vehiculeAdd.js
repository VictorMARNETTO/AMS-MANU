module.exports = (req, res) => { // ajout d'articles
    if (req.session.userId) {
        return res.render("vehicules/add-vehicules")
    }
    res.redirect("/user/login")
}