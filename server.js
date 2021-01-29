import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cron from 'node-cron';
import 'dotenv/config';
import regeneratorRuntime from 'regenerator-runtime';
import { getEndpoint } from './src/get-endpoint';

const port = 4000;
const db = 'stream_logging';
const collection = 'stream_logs';
const streamingServerIP = 'http://10.0.0.117:8000';
const serverStatusEndpoint = '/api/server';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/health', (req, res) => {
	res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
	res.end('Healthy, daddy!');
});

const logNewServerData = async () => {
	console.log(`----------   logNewServerData @ ${new Date()}   ------------`);
	const serverStatus = await getEndpoint({
		ipAddress: streamingServerIP,
		endpoint: serverStatusEndpoint
	});
	console.log(`serverStatus is`, serverStatus);
};

logNewServerData();

// cron.schedule('*/5 * * * *', () => {
	// console.log(`cronJob @ ${new Date()}`);
	// logNewServerData();
// });

app.listen(port, (e) => {
	if (e) throw Error(`Could not start the server on port: ${port}`);
	console.log(`Hello, and welcome! The node-stream-logging server is running on port ${port}`);
});
