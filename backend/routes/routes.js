const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { deleteConfigController, updateConfigController, getConfigsController, addConfigController } = require('../controllers/configController');

router.delete('/:id', authMiddleware,deleteConfigController);

router.put('/:id',authMiddleware ,updateConfigController);
  
router.get('/',getConfigsController);

router.post('/',authMiddleware ,addConfigController);

module.exports = router;
