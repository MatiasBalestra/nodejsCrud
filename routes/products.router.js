const express = require('express');
const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {createProductSchema, updateProductSchema, getProductSchema} = require('./../schemas/produc.schema');



const service = new ProductsService();

const router = express.Router();


router.get('/', async (req, res) => {

  const products = await service.find();
  res.json(products);
}
);


router.get('/filter', (req, res) => {
  res.send('Hello World!');
}
);


router.get('/:id',
validatorHandler(getProductSchema, 'params'),
async (req, res, next) => {
  try {
    const {id} = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
}
);


// Post

router.post('/',
validatorHandler(createProductSchema, 'body'),
async (req, res) => {
  const body = req.body;

  const newProduct = await service.create(body);

  res.status(201).json({
    newProduct
  })
});


// Patch

router.patch('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
async (req, res, next) => {
  try {
    const {id} = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json({
      product
    })
  } catch (error) {
    next(error);
  }

});

// PUT

router.put('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
async (req, res, next) => {

  try {
    const {id} = req.params;
    const body = req.body;
    const product = await service.updatePut(id, body);

    res.json({
      product
    })

  } catch (error) {
    next(error);
  }


});


// Delete

router.delete('/:id', async (req, res) => {
  const {id} = req.params;

  const product = await service.delete(id);
  res.json({
    product
  })
});



module.exports = router;