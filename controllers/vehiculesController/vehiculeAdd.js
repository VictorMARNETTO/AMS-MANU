module.exports = (req, res) => { // ajout d'articles
    if (req.session.adminId) {
        return res.render("vehicules/add-vehicules")
    }
    res.redirect("/admin/login")
}