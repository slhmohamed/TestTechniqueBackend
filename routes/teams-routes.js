const express=require('express');
const { getAllMatch} = require('../controllers/teams.controller');
 


const router =express.Router();
 

router.get('/aggregation',getAllMatch)

 
module.exports={
    routes:router
}