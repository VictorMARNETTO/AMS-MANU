const post = require('../database/models/Vehicule')

module.exports = async (req, res) => {
    
    const vehicule = await post.findById(req.params.id)

    res.render('vehicule', { vehicule }
        // console.log(req.params);
    )
}