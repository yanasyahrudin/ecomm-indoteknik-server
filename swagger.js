const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');

const app = express();

// Definisikan spesifikasi Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'INDO TEKNIK',
      version: '1.0.0',
      description: 'Node JS API Project for PosgrestSQL',
    },
    servers: [
        {
            url: "https://indoteknikserver-732012365989.herokuapp.com"
        }
    ]
  },
  // Path ke file yang berisi komentar-komentar Swagger di kode Anda
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Tambahkan route untuk dokumentasi Swagger
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Tambahkan route-routes API Anda di bawah ini

// Port aplikasi
const port = 3000;

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan pada https://indoteknikserver-732012365989.herokuapp.com:${port}`);
});
