const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;


app.use(express.json());
/* const whitelist = ['http://localhost:8080', 'https://myapp.co']; */
/* const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
} */
app.use(cors());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}
);




/* app.get('/', (req, res) => {
  res.send('Hello World!');
}
);

app.get('/home', (req, res) => {
  res.send('soy la home de rusher');
}
);



app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const {categoryId, productId} = req.params;
  res.json(
    {
    categoryId,
    productId,
    name: 'product 1',
    price: 1000
  })

});

 */






