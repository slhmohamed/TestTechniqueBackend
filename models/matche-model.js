const mongoose=require('mongoose');
const matcheSchema=mongoose.Schema({
  round:{
    type:Number,
  
  },

  game:{
      type:Number
  },

  teams:{
      type:[{
          home:String,
          away:String
        }
      ]
  },
  scores:{ 
    type:[{
        home:Number,
        away:Number
      }
    ]
}
})
const MatchModel = mongoose.model('matches',matcheSchema);

exports.MatchModel=MatchModel
 