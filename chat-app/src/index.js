import express from 'express';
import path from 'node:path';

const __dirname = import.meta.dirname;
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log('listening on port 3000...');
});