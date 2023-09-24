const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

//crear bd de memoria: array de productos
let products = [
    {
        id: 1,
        name:'laptop',
        price: 1500,
    },
    {
        id: 2,
        name:'celular',
        price: 500,
    },
    {
        id: 3,
        name:'table',
        price: 1000,
    },
];

//creacion de crud de productos
//Obetenr una lista de productos => GET api/products
app.get('/api/products', (req, res) => {
    res.status(200).json({
         message: 'Lista de productos',
         data: products,
    });
  });

  //Obtener un producto por id => GET api/products/:id
  app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find((product) => product.id == id);

    if (!product){
        res.status(404).json({
            message: 'producto no encontrado',
            data: null,
        });
        return;
    }

    res.status(200).json({
         message: 'Lista de productos',
         data: product,
    });
  });

  // Crear un producto => POST api/product
  app.post('/api/products', (req, res) => {
    const product = req.body;
    products.push(product);
    res.status(201).json({
      message: 'producto creado',
      data: product,
    });
  });

// actualizar un producto => PUT api/products/:id
app.put('/api/products/:id', function (req, res) {
  const id = req.params.id;
  const product = req.body;

  if (!product) {
    res.status(400).json({
      message: 'Producto no enviado',
      data: null,
    });
    return;
  }

  const index = products.findIndex((product) => product.id == id);

  if (index === -1) {
    res.status(404).json({
      message: 'Producto no encontrado',
      data: null,
    });
    return;
  }

  products[index] = product;

  res.status(200).json({
    message: 'Producto actualizado',
    data: product,
  });
});

// Eliminar un producto => DELETE api/products/:id
app.delete('/api/products/:id', function (req, res) {
  const id = req.params.id;

  const index = products.findIndex((product) => product.id == id);

  if (index === -1) {
    res.status(404).json({
      message: 'Producto no encontrado',
      data: null,
    });
    return;
  }

  products.splice(index, 1);

  res.status(200).json({
    message: 'Producto eliminado',
    data: null,
  });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});