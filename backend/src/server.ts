import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import cors from 'cors';

// Configuração
const app = express();
const router = express.Router();
app.use(cors());
app.use(express.json());
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

router.get('/customers', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM customers');
    res.send(result.rows as Customer[]);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.post('/customers', async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;

  try {
    const customer: Customer = { name, email, phone };
    await pool.query('INSERT INTO customers (name, email, phone) VALUES ($1, $2, $3)', [
      customer.name,
      customer.email,
      customer.phone,
    ]);
    res.status(201).send();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.use('/customers', router);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});