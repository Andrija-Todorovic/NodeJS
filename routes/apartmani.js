const { request } = require('express');
const express = require('express');
const router = express.Router();
var multer = require('multer');
const { query } = require('../connection');
var mysqlConnection = require('../connection');


// define storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/image')
  },
  //  add back the extension
  filename: function (req, file, cb) {
      cb(null,  file.originalname);
  },
});
 
var upload = multer({ 
    storage: storage,
    limits:{
        fieldSize: 1024 * 1024 *3,
    },
});



//multer end

router.get('/', (req, res, next) => {
    mysqlConnection.query("SELECT * FROM apartmani", (err, rs) => {
        if (err) {
            throw err;
        }
        else {
            res.render('apartmani/apartmani', {
                title: 'Apartmani',
                style: 'apartmani.css',
                js: '',
                apartman: rs
            });
        }
    });
});

// delete option

router.get('/delete/:id', async(req, res, next) =>{
    const sql = `DELETE FROM apartmani WHERE id = ${req.params.id}`;
    mysqlConnection.query(sql, (err, rs) =>{
        if(err) {
            console.log(err);
        }
        else {
            console.log('/delete');
            res.redirect('/apartmani');
        }
    })
});

// update product
router.get('/edit/:id', async (req, res, next)=>{
    const sql = `SELECT * FROM apartmani WHERE id = ${req.params.id}`;
    mysqlConnection.query(sql, (err, rs) =>{
        if(err){
            console.log(err);
        }
        else{
            res.render('apartmani/edit', {
                title: 'Edit product',
                style: 'apartmani.css',
                apartman: rs
            });
        }
    });
});


//! POST UPDATE change
router.post('/edit/:id', (req, res) =>{
    const { name, lname, street, phone, date, square, email, image } = req.body;
    const sql = `UPDATE apartmani SET ? WHERE id = ${req.params.id}`;
    mysqlConnection.query(sql, { ime: name, prezime : lname, email : email, datum: date, ulica : street, kvadratura : square, image : image }, (err, rs) =>{
        if(err){
            console.log(err);
        }
        else {
            res.redirect('/apartmani')
        }
    })
})


// NOVA OBJAVA
router.get('/novi_post', async(req, res, next) =>{
    res.render('apartmani/novi_post',{
        title: 'Add new product',
        style: '',
        js: ''
    });
});

// POST INSERT dodavanje proizvoda
router.post('/novi_post', upload.single('image') , async(req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const lname = req.body.lname;
    const email = req.body.email;
    const date = req.body.date;
    const street = req.body.street;
    const square = req.body.square;
    const image = req.file.filename;

    mysqlConnection.query('INSERT INTO apartmani SET ?', { ime: name, prezime : lname, email : email, datum: date, ulica : street, kvadratura : square, image : image }, (err, rs) => {
        if(err){
            console.log(err);
        }
        else {
            res.redirect('/apartmani');
        }
    })
});


module.exports = router