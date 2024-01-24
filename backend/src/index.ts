import express, { Request, Response } from 'express';

import { Pool } from 'pg';

import cors from 'cors';

// Configuração

const app = express();

app.use(express.json());

app.use(cors());

const PORT = 3001


// Conexão com o banco de dados

const config = {

  host: 'localhost',

  port: 5432,

  database: 'mydatabase',

  user: 'myuser',

  password: 'mypassword',

};




const pool = new Pool(config);



interface Customer {

  id?: number;

  name: string;

  email: string;

  phone: string;

  x_coordinate?: number;

  y_coordinate?: number;

}



// Rotas
app.get('/customers', async (req: Request, res: Response) => {

  try {

    const result = await pool.query('SELECT * FROM customers');

    res.send(result.rows as Customer[]);

  } catch (err) {

    console.error(err);

    res.status(500).send(err);

  }

});




app.post('/customers', async (req: Request, res: Response) => {

  const { name, email, phone, x_coordinate, y_coordinate } = req.body;




  try {

    const customer: Customer = { name, email, phone, x_coordinate, y_coordinate };

    await pool.query('INSERT INTO customers (name, email, phone, x_coordinate, y_coordinate) VALUES ($1, $2, $3, $4, $5)', [

      customer.name,

      customer.email,

      customer.phone,

      customer.x_coordinate,

      customer.y_coordinate

    ]);

    res.status(201).send();

  } catch (err) {

    console.error(err);

    res.status(500).send(err);

  }

});

// Inicialização do servidor
app.listen(PORT, () => {

  console.log(`Server listening on ${PORT}`);

});
