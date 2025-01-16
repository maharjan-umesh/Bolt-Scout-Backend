import express, { Request, Response } from 'express';
import webhookRouter from './routes/webhook';
import { startScheduler } from './startScheduler';
import { AddressInfo } from 'net';

const app = express();

// Mount the webhook router
app.use(webhookRouter);

// Start the scheduler
startScheduler();

// Catch-all handler for invalid routes
app.use((req: Request, res: Response) => {
  console.warn(`404 - Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Route not found' });
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  const addressInfo = server.address() as AddressInfo;
  let address = 'localhost';

  if (addressInfo.address === '::') {
    address = 'localhost';
  } else if (addressInfo.address === '0.0.0.0') {
    address = 'localhost';
  }
  console.log(`Server listening at http://${address}:${addressInfo.port}`);
  console.log(`Webhook endpoint available at http://localhost:${port}/webhook`);
});
