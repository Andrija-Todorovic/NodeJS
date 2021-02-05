const express = require('express')
const router = express.Router()


router.get('/', (req,res) => {
   res.send('In articless')
})


module.exports = router