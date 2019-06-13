// const vehicule = require('../database/models/Vehicule') // supprime les posts

// module.exports = (req, res) => {

//        let vehiculeId = req.params.id;

//        vehicule.findByIdAndDelete(vehiculeId, function (err) {
//            if (err)
//                throw err;
//        })
    
//        res.redirect('/admin-pannel')

// }

const Delete = require('../../database/models/Vehicule')

module.exports =  async (req, res) => {

       const vehiculeId = await Delete.findById(req.params.id)

       Delete.findByIdAndRemove(vehiculeId, function (err) {
           if (err)
               throw err;
               console.log(err);
               
       })
           console.log(Delete);

       res.redirect('/admin-pannel')

}