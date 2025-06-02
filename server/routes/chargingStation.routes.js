import express from 'express';
import { createStation, deleteStation, getAllStations, getStationById, updateStation } from '../controller/charginStation.controller.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();
router.get('/', getAllStations);         // Read All

router.use(authenticate)

router.post('/', createStation);         // Create
router.put('/:id', updateStation);       // Update by ID
router.delete('/:id', deleteStation); 
router.get("/:id",getStationById)   // Delete by ID

export default router;
