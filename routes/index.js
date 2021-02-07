import express from 'express';
import { getServerIP } from './apiv1/getServerIP';
import { getAllData } from './apiv1/getAllData';
import { getServerStatusSummary } from './apiv1/getServerStatusSummary';

const router = express.Router();

router.use('/apiv1', getServerIP);
router.use('/apiv1', getAllData);
router.use('/apiv1', getServerStatusSummary);

export default router;
