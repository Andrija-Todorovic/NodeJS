const { request } = require('express');
const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next){
    res.render('kuce/kuce', {
        title: 'Kuce',
        style: 'kuce.css',
        js: ''
    });
});




module.exports = router