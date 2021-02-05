import express from 'express';
import { getServerIP } from './apiv1/getServerIP';
import { getAllData } from './apiv1/getAllData';

const router = express.Router();

router.use('/apiv1', getServerIP);
router.use('/apiv1', getAllData);

export default router;
