import * as tourSettings from '../controllers/tourSettingsController.js';
import express from 'express';

const router = express.Router();

router.get('/tourSettings', tourSettings.getSettings);
router.put('/tourSettings', tourSettings.updateSettings);


export default router;