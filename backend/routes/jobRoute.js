import { Router } from 'express';

import jobController from '../contollers/jobController.js';

const router = Router();

router.route('/similar/:jobId').get(jobController.getTop10Similar);

router.route('/').get(jobController.getAllJobs);

router.route('/:jobId').get(jobController.getJob);

export default router;
