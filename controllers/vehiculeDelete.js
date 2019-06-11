const vehicule = require('../database/models/Vehicule') // supprime les posts

module.exports = (req, res) => {

       let vehiculeId = req.params.id;

       vehicule.findByIdAndDelete(vehiculeId, function (err) {
           if (err)
               throw err;
       })
    
       res.redirect('/admin-pannel')

}