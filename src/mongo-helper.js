import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const dbConnect = async () => {
	const url = process.env.MONGO_DB_URL || 'mongodb://127.0.0.1:27017/';
	const client = new MongoClient(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	await client.connect();
	console.log('connected to db');
	return client;
};

export const mongoDBInsertOne = async ({targetDB, targetCollection, dataToInsert}) => {
	console.log(`Writing new data: ${dataToInsert}`);
	try {
		const client = await dbConnect();
		const db = client.db(targetDB);
		console.log(`connected to db: ${db}`);
		const result = await db.collection(targetCollection).insertOne(dataToInsert);
		return result.result;
	} catch (err) {
		console.log(err);
	}
};
