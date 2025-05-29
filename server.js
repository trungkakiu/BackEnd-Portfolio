import express from 'express';
import db from './db.js';
import initApiRoute from './Src/Routes/initApiRoute.js';
import CORSconfig from './config/CORSconfig.js'
import bodyParser from 'body-parser';
import cors from 'cors';
import flash from 'flash';
const app = express();
const PORT = 3001;
app.use(cors(CORSconfig.CORSsetting()));

app.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send('Lỗi DB');
    res.json(results);
  });
});
app.use(express.json()); 
app.use(bodyParser.json());
app.use(express.json());
initApiRoute(app);

app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});

