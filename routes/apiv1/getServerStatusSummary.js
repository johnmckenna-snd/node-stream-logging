import express from 'express';
import { mongoDBGetLastHour } from '../../src/mongo-helper';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const db = process.env.DB;
const collection = process.env.COLLECTION;

router.get('/get-server-status-summary', async (req, res) => {
	const lastHourData = await mongoDBGetLastHour({
		targetDB: db,
		targetCollection: collection
	});
	res.send({data: {
		lastHourData: lastHourData,
		lastDayData: [],
		lastWeekData: [],
		lastMonthData: []
	}});
});

export { router as getServerStatusSummary };
