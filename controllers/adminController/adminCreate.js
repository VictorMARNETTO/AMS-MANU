module.exports = (req, res) => {
    //console.log(req.session.registerError);
    
    res.render("admin/register",{
        errors: req.flash('registerError'),
        data : req.flash('data')[0]
    })
}