import express from 'express';
import { getSeriesInfo } from '../controllers/seriesController.js';

const router = express.Router();

// Define the route to fetch series data with seriesId as a parameter
router.get('/:seriesId', getSeriesInfo);

export default router;
