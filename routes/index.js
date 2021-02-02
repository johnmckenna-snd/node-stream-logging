import express from 'express';
import { getServerIP } from './apiv1/getServerIP';

const router = express.Router();

router.use('/apiv1', getServerIP);

export default router;
