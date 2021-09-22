const { TeamModel } = require('../models/team-model');
const { MatchModel } = require('../models/matche-model')


module.exports.getAllMatch = async (req, res) => {

  try {

    const matches = await TeamModel.aggregate([
      {
        $lookup:
        {
          from: "matches",
          localField: "_id",
          foreignField: "teams.home",
          as: "matcheHome"
        },

      },
      {
        $lookup:
        {
          from: "matches",
          localField: "_id",
          foreignField: "teams.away",
          as: "matcheAway"
        },

      },
      {
        $project: {
          team: {
            id: "$_id",
            teams: "$name"
          },
          played: {
            $add: [
              { $size: '$matcheAway' },
              { $size: '$matcheHome' }
            ]
          },

          won: {
           
            $add: [
              {
                $size: {
                  $filter: {
                    input: "$matcheHome",
                    cond: { $and: [
                      { $gt: ["$matcheHome.scores.home", "$matcheHome.scores.away" ] },
                      { $gt: [ "$matcheHome.scores.home", "$matcheHome.scores.away" ] }
                    ] }
                }}
                
              },
              {
                $size: {
                  $filter: {
                    input: "$matcheAway",
                    
                    cond: { $and: [
                      { $lt: ["$matcheAway.scores.home", "$matcheAway.scores.away" ] },
                      { $lt: [ "$matcheAway.scores.home", "$matcheAway.scores.away" ] }
                    ] }
                  }

                }
              }
            ]
              
          },

         
         
       

          drow: {

            $add: [
              {
                $size: {
                  $filter: {
                    input: "$matcheHome",
                 
                    cond: { $eq: ["$matcheHome.scores.home", "$matcheHome.scores.away"] }
                  }

                }
              },
              {
                $size: {
                  $filter: {
                    input: "$matcheAway",
                    
                    cond: { $eq: ["$matcheAway.scores.away", "$matcheAway.scores.home"] }
                  }

                }
              }
            ]
          },


          lost: {
            
            
            $add: [
              {
                $size: {
                  $filter: {
                    input: "$matcheHome",
                    
                    cond: { $lt: ["$matcheHome.scores.home", "$matcheHome.scores.away"] }
                  }

                }
              },
              {
                $size: {
                  $filter: {
                    input: "$matcheAway",
               
                    cond: { $gt: ["$matcheAway.scores.home", "$matcheAway.scores.away"] }
                  }

                }
              }
            ]
              
          },




          goal_for: {
            $add: [
              { $sum: "$matcheHome.scores.home" },
              { $sum: "$matcheAway.scores.away" },
             
            ],
             
          },
          

          goal_against: {
            $add: [
              { $sum: "$matcheHome.scores.away" },
              { $sum: "$matcheAway.scores.home" }
            ]
          },
          goal_difference: {
            $subtract: [{
              $add: [
                { $sum: "$matcheHome.scores.home" },
                { $sum: "$matcheAway.scores.away" }
              ]
            }, {
              $add: [
                { $sum: "$matcheHome.scores.away" },
                { $sum: "$matcheAway.scores.home" }
              ]
            }]
          },
          points:{
            $add:[{ 
            $multiply:[ 
          {  $add: [
            {
              $size: {
                $filter: {
                  input: "$matcheHome",
               
                  cond: { $gt: ["$matcheHome.scores.home", "$matcheHome.scores.away"] }
                }

              }
            },
            {
              $size: {
                $filter: {
                  input: "$matcheAway",
                  
                  cond: { $lt: ["$matcheAway.scores.home", "$matcheAway.scores.away"] }
                }

              }
            }
          ]},3]
        },
          
          {   $add: [
            {
              $size: {
                $filter: {
                  input: "$matcheHome",
               
                  cond: { $eq: ["$matcheHome.scores.home", "$matcheHome.scores.away"] }
                }

              }
            },
            {
              $size: {
                $filter: {
                  input: "$matcheAway",
                  
                  cond: { $eq: ["$matcheAway.scores.away", "$matcheAway.scores.home"] }
                }

              }
            }
          ]
            
        }]

          },
          
        }
      },



      /*  {$lookup:
              {from:"matches",
              localField:"_id",
              foreignField:"teams.away", 
             as:"matcheAway"},
            
         },
         {
             $project: {
               _id: "$_id",
              played: {
                 $size: '$matcheAway',
               },
               goal_for:{$sum:"$matcheAway.scores.home"},
               goal_against:{$sum:"$matcheAway.scores.away"},
               goal_difference:{$subtract:[{$sum:"$matcheAway.scores.home"},{$sum:"$matcheAway.scores.away"}]}
             },
           } ,
          
        */



    ])


    return res.status(201).json(matches);
  }

  catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}