const {TeamModel}=require('../models/team-model');
const {MatchModel}=require('../models/matche-model')


module.exports.getAllMatch= async (req,res)=>{
  
    try{
         
        const matches=await MatchModel.find();
        return res.status(201).json(matches);
    }
   
        catch(err){
            return res.status(500).json({ message: err });
        }    
}