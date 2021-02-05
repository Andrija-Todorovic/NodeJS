const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const app = express();

app.use(express.static('public'));
app.use(express.json());


router.post('/', (req, res) =>{
    console.log(req.body);
    const transporter = nodemailer.createTransport({
        host: 'localhost',
        service: 'gmail',
        auth: {
            user: 'andrijatestmail@gmail.com',
            pass:'password.001'
        }
    });
    
    const mailOptions = {
        from: req.body.email,
        to: 'andrijatestmail@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
        }
        
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('Error!');
        }else{
            console.log('Email sent!');
            res.send('succes');
        }
    })
});
/////////////////////////////////////////////////////////
router.get('/', function(req, res, next){
    res.render('kontakt/kontakt', {
        title: 'Contact',
        style: 'kontakt.css',
        js: ''
    });
});

module.exports = router