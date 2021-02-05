const express = require('express');
const { query } = require('../connection')
const mysqlConnection = require('../connection')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

require("dotenv").config();


//! REGISTER PAGE VIEW
router.get('/register', (req, res, next) => {
    res.render('register/register', {
        title: 'Register',
        style: 'register.css',
        message: ''
    });
});

//! POST REGISTER 
router.post('/register', async(req, res, next) => {
    console.log(req.body);

    const { name, email , password, passwordConfirm} = req.body;

    mysqlConnection.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) =>{
        if(error) {
            console.log(error);
        }else{
        if(results.length > 0) {
            return res.render('register/register', {
                title: 'Register',
                style: 'register.css',
                message: 'That email is already in use!'
            })
        
        }else if( password !== passwordConfirm ){
            return res.render('register/register', {
                title: 'Register',
                style: 'register.css',
                message: 'Passwords do not match!'
            });
        }
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

     mysqlConnection.query('INSERT INTO users SET ? ', { name: name, email: email, password: hashedPassword},(error, results)=>{
            if(error){
                console.log(error);
            } else {
                console.log(results);
                return res.render('register/register', {
                title: 'Register',
                style: 'register.css',
                message: 'User registerd!'
            });
            }
        });
    
    });
});

//! LOGIN GET PAGE VIEW
router.get('/login', (req, res, next) => {
    res.render('login/login', {
        title: 'Login',
        style: 'login.css',
        message: ''
    });
});

//! POST LOGIN
router.post('/login',  async(req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    mysqlConnection.query('SELECT * FROM users WHERE email = ?', [email], async (err, rs) => {
        console.log(rs);
        if( !rs || !(await bcrypt.compare(password, rs[0].password)) ){
            res.status(401).render('login/login', {
                title: 'Login',
                style: 'login.css',
                message: 'Bad data format'
            })
        }
        else{
            const id = rs[0].id;

            const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            console.log("The token is:" + token);

            const cookieOption = {
                expires: new Date(
                    Date.now() + process.env.JWT.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            }
            res.cookie('jwt', token, cookieOption);
            res.status(200).redirect('/');
        }
    });
});

//! LOGIN DEFINE 




// EXPORT 
module.exports = router;