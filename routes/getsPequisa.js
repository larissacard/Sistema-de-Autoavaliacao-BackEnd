const express = require('express');
const route = express.Router;
const get = require('../controllers/gets/getPequisa');

route.get('/pesquisa', async function (req, res){
    const pesuisa = await get.getPequisa();
    
})