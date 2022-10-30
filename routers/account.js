const express = require('express');
const router = express.Router();
const acc_Controller = require('../controllers/account');

router.get('/', acc_Controller.account);
router.get('/expense/:id', acc_Controller.expense);
router.post('/add', acc_Controller.add);
router.get('/delete/:id', acc_Controller.delete);

module.exports = router;