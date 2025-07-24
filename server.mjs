import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.static('.'));

const port = process.env.PORT || 8787;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
