express = require('express');
router = express.Router();
let controller = require('./controllers/controller');

router.get('/',(req,res)=>res.redirect('/home'));
router.get('/home', controller.itemlist);


router.post('/home/delete',controller.deleteitem);

// router.get('/home/delete',controller.newlist);


router.get('/page2',controller.showpage);
router.post('/page2',controller.additem);




module.exports= router;
