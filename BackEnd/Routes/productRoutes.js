const express = require('express');
const router = express.Router();
const productControllre = require('../Controllers/productControllre');

router.get('/', productControllre.ProductData);
router.delete('/:id', productControllre.deleteProduct);

module.exports = router;