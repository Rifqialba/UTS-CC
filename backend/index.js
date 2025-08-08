const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const db = mysql.createConnection({
  host: 'databaseudin.cvei06i02g38.ap-southeast-2.rds.amazonaws.com',
  user: 'adminudin',
  password: 'baraqimak123',
  database: 'healthstore'
});

app.get('/produk', (req, res) => {
  db.query('SELECT * FROM produk', (err, results) => {
    if (err) {
      console.error('Query error:', err);
      res.status(500).send('Error retrieving data');
    } else {
      res.json(results);
    }
  });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('API berjalan di http://0.0.0.0:3000');
});
