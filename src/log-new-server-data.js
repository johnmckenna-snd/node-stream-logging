import { getEndpoint } from './get-endpoint';
import { mongoDBInsertOne } from './mongo-helper';
import 'dotenv/config';

const db = process.env.DB;
const collection = process.env.COLLECTION;
const streamingServerIP = process.env.STREAMING_SERVER_IP;
const serverStatusEndpoint = process.env.SERVER_STATUS_ENDPOINT;
const serverStreamsEndpoint = process.env.SERVER_STREAMS_ENDPOINT;

export const logNewServerData = async () => {
	console.log(`----------   logNewServerData @ ${new Date()}   ------------`);

	const serverStatus = await getEndpoint({
		ipAddress: streamingServerIP,
		endpoint: serverStatusEndpoint
	});
	console.log(`serverStatus is`, serverStatus);

	const serverStreams = await getEndpoint({
		ipAddress: streamingServerIP,
		endpoint: serverStreamsEndpoint
	});
	console.log('serverStreams are', serverStreams);

	const dbEntry = {
		serverStatus: serverStatus,
		serverStreams: serverStreams
	};
	const insertServerData = await mongoDBInsertOne({
		targetDB: db,
		targetCollection: collection,
		dataToInsert: dbEntry
	});
	console.log('insertServerData:', insertServerData);
};
