const post = require('../database/models/Vehicule')

module.exports = async (req, res) => {
    const posts = await post.find({}).sort({_id:-1}).limit(3)
    // console.log(posts);
    // console.log(req.session);
    
    res.render("garagePage",
        { posts }
    )
}