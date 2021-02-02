import express from 'express';
const router = express.Router();

router.get('/get-server-ip', (req, res) => {
	res.send('woot');
});

export { router as getServerIP };
