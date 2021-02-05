const { request } = require('express');
const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next){
    res.render('pocetna/pocetna', {
        title: 'Pocetna',
        style: 'pocetna.css',
        js: ''
    });
});






module.exports = router