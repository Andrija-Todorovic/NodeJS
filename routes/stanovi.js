const { request } = require('express');
const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next){
    res.render('stanovi/stanovi', {
        title: 'Stanovi',
        style: 'stanovi.css',
        js: ''
    });
});




module.exports = router