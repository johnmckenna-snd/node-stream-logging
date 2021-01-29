import { getEndpoint } from './get-endpoint';
import { mongoDBInsertOne } from './mongo-helper';

export const logNewServerData = async ({
	streamingServerIP,
	serverStatusEndpoint,
	serverStreamsEndpoint,
	db,
	collection
}) => {
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
