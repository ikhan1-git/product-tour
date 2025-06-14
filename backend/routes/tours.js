import * as tourController from '../controllers/tourController.js';
import express from 'express';
const router = express.Router();
router.post('/tours', tourController.createTour);
router.get('/tours', tourController.getTours);
router.get('/tours/:id', tourController.getTourById);
router.put('/tours/:id', tourController.updateTour);
router.delete('/tours/:id', tourController.deleteTour);


export default router;