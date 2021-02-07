import express from 'express';
import { mongoDBGetAllDocuments } from '../../src/mongo-helper';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const db = process.env.DB;
const collection = process.env.COLLECTION;

router.get('/get-all-data', async (req, res) => {
	const data = await mongoDBGetAllDocuments({
		targetDB: db,
		targetCollection: collection
	});
	console.log('found', data.length, 'documents');
	const result = res.send({data: data});
	console.log('/get-all-data called. status: ', result.statusMessage);
});

export { router as getAllData };
