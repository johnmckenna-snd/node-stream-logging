import express from 'express';

const router = express.Router();

router.get('/get-all-data', async (req, res) => {
	const result = res.send({'get-all-data': 'all-data'});
	console.log('/get-all-data called. status: ', result.statusMessage);
});

export { router as getAllData };
