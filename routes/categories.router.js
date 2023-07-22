const express = require('express');



const router = express.Router();




router.get('/:categoryId/products/:productId', (req, res) => {
  const {categoryId, productId} = req.params;
  res.json(
    {
    categoryId,
    productId,
    name: 'product 1',
    price: 1000
  })

});


module.exports = router;
