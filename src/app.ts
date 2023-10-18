import express from 'express';
import productRoute from './database/Routes/products.route';
import ordersRoute from './Routes/orders.route';

const app = express();

app.use(express.json());
app.use('/products', productRoute);
app.use('/orders', ordersRoute);
export default app;
