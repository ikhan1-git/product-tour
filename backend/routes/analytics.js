import express from 'express';
import * as tourAnalytics from '../controllers/analyticsController.js';

const router = express.Router();

router.post('/tourAnalytics/view', tourAnalytics.incrementView);
router.post('/tourAnalytics/completion', tourAnalytics.incrementCompletion);

export default router;