import { Router } from 'express';

let router = Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'You made it!' });
});

export default router;

