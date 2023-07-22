const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(30);
const price = Joi.number().min(1);
const image = Joi.string().uri();
const description = Joi.string().max(300);
const material = Joi.string().max(30);
const department = Joi.string().max(30);
const category = Joi.string().max(30);
const isBlock = Joi.boolean();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  material: material.required(),
  department: department.required(),
  category: category.required(),
  isBlock: isBlock.required()
});


const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  material: material,
  department: department,
  category: category,
  isBlock: isBlock
});

const getProductSchema = Joi.object({
  id: id.required()
});


module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema
}




