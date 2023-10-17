import express from 'express';
import productRoute from './database/Routes/products.route';

const app = express();

app.use(express.json());
app.use('/products', productRoute);
export default app;
