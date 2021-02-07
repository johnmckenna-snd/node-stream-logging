import { MongoClient, ObjectID } from 'mongodb';
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

export const mongoDBGetAllDocuments = async ({targetDB, targetCollection}) => {
	console.log('Getting all the data. all of it. all at once.');
	try {
		const client = await dbConnect();
		const db = client.db(targetDB);
		console.log(`connected to db: ${db}`);
		const result = await db.collection(targetCollection).find({}).toArray();
		return result;
	} catch (err) {
		console.log(err);
	};
};

export const mongoDBGetLastHour = async ({targetDB, targetCollection}) => {
	console.log(`mongoDBGetLastHour from db: ${targetDB} and collection: ${targetCollection}`);

	const ONE_HOUR = 60 * 60 * 1000;
	const currentTime = new Date();
	const oneHourAgo = new Date(currentTime.getTime() - ONE_HOUR);

	console.log('oneHourAgo', oneHourAgo);

	const oneHourAgoID = ObjectID(Math.floor((oneHourAgo / 1000)).toString(16) + '0000000000000000');
	console.log('oneHourAgoID', oneHourAgoID);

	const findStage = {
		'$match': { '_id': { '$gt': oneHourAgoID } }
	};

	const dateConversionStage = {
		'$addFields': {
			'date': { '$toDate': '$_id' }
		}
	};

	const sortStage = {
		'$sort': {
			'date': 1
		}
	};

	try {
		const client = await dbConnect();
		const db = client.db(targetDB);
		console.log(`connected to db: ${db}`);
		const result = await db
			.collection(targetCollection)
			.aggregate([
				findStage,
				dateConversionStage,
				sortStage
			])
			.toArray();
		console.log(`found ${result.length} documents`);
		return result;
	} catch (err) {
		console.log(err);
	};
};
