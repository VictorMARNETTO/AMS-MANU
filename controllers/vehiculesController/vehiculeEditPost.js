const vehicule = require('../../database/models/Vehicule')
   , path        = require('path')


module.exports =  (req,res) => {

   let query = {_id:req.body.vehiculeId}
   const {image} = req.files
      const uploadFile = path.resolve(__dirname, '..','public/vehicules',image.name);
      image.mv(uploadFile, (error)=>{
          vehicule.findOneAndUpdate(query, {...req.body, image: `/vehicule/${image.name}`}, function(error, post){
                  if(error){
                           console.log(error);
                          return;
                  }else{
                          res.redirect('/admin-pannel');
                  }
                   });
           })
   }