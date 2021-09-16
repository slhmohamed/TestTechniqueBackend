const mongoose=require('mongoose');
const TeamSchema=mongoose.Schema({
  name:{
    type:String
  }  
})
 

 
const TeamModel=mongoose.model('teams',TeamSchema)
exports.TeamModel=TeamModel