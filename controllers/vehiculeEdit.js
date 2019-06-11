const Edit = require ("../database/models/Vehicule");

module.exports = async (req,res) => {

  const vehicule = await Edit.findById(req.params.id)
  const image = await Edit.findById(req.params.image)

  res.render ('vehicules/edit-vehicule', {vehicule, image}) 
};