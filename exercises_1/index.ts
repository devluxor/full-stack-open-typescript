import express from 'express';
import calculationsRouter from './calculationsRouter';
const app = express();

app.use(express.json());
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.use('/', calculationsRouter);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});