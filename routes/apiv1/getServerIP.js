import express from 'express';
import os from 'os';

const router = express.Router();
const networkInterfaces = os.networkInterfaces();
const en0ipv4 = networkInterfaces;

router.get('/get-server-ip', (req, res) => {
	res.send({data: en0ipv4});
});

export { router as getServerIP };
