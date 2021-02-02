import express from 'express';
import os from 'os';

const router = express.Router();
const networkInterfaces = os.networkInterfaces();
const en0ipv4 = networkInterfaces.en0[1];

router.get('/get-server-ip', (req, res) => {
	res.send({'serverIP': en0ipv4});
});

export { router as getServerIP };
