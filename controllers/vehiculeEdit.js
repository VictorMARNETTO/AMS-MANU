const Edit = require ("../database/models/Vehicule");

module.exports = async (req,res) => {

  const vehicule = await Edit.findById(req.params.id)

  res.render ('vehiculeEdit', {vehicule}) 
};