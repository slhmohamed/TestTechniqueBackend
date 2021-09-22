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
          home:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "matches"
          },
          away:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "matches"
          },
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
 