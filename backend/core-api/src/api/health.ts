import { Router, type Request, type Response } from 'express';

const router = Router();

router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'core-api',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default router;
