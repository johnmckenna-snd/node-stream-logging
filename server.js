import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cron from 'node-cron';
import 'dotenv/config';
import regeneratorRuntime from 'regenerator-runtime';
import { logNewServerData } from './src/log-new-server-data';
import router from './routes/index';

const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.get('/health', (req, res) => {
	res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
	res.end('Healthy, daddy!');
});

cron.schedule('*/5 * * * *', () => {
	console.log(`cronJob @ ${new Date()}`);
	logNewServerData();
});

app.listen(port, (e) => {
	if (e) throw Error(`Could not start the server on port: ${port}`);
	console.log(`Hello, and welcome! The node-stream-logging server is running on port ${port}`);
});
