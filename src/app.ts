import express from 'express';
import productRoute from './Routes/products.route';
import ordersRoute from './Routes/orders.route';
import loginRoute from './Routes/login.route';

const app = express();

app.use(express.json());
app.use('/login', loginRoute);
app.use('/products', productRoute);
app.use('/orders', ordersRoute);
export default app;
