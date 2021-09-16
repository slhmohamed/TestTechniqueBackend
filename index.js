'use strict';
const port = process.env.PORT;
const express=require('express');
const cors =require('cors');
const environement=require('./environnement');
 
 
 
 
const app=express();
  
 

 

const teamsRouter=require('./routes/teams-routes');
 
 
 
require('./stratup/db')();
 
 
app.use(express.json())
 

 
app.use('/team',teamsRouter.routes);
 
 

app.listen(environement.port, () => console.log('App listening on url:http://localhost:'+environement.port));