const {faker} = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  };

  async generate() {
  const limit = 100;

  for ( let i = 0; i < limit; i++) {
    this.products.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
      description: faker.commerce.productDescription(),
      material: faker.commerce.productMaterial(),
      department: faker.commerce.department(),
      category: faker.commerce.product(),
      isBlock: faker.datatype.boolean()
    });
  };};


  async create (data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    };

    this.products.push(newProduct);
    return newProduct;
  };

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.products.length === 0) {
          reject(new Error('No se encontraron productos'));
        } else {
          resolve(this.products);
        }
      }, 5000);
    });
  };

  async findOne(id) {
      const product = this.products.find(item => item.id === id);
      if (!product) {
        throw boom.notFound(`No se encontró ningún producto con el id ${id}`);
      }
      if(product.isBlock) {
        throw boom.conflict(`El producto con el id ${id} está bloqueado`);
      }
      return product;

  };

 async updatePut(id, changes) {
    {
      const index = this.products.findIndex(item => item.id === id);
      if (index === -1) {
        throw new Error('Product not found');
      }

      this.products[index] =
      {
        id,
        ...changes
      }

      return this.products[index];

    };};

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      id,
      ...product,
      ...changes
    };
    return this.products[index];

  };

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return {id};
  };



}


module.exports = ProductsService;
