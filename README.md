# node-stream-logging
a node server that logs the streaming server api into mongodb, and serves the data to a dashboard

## welcome!
I wanted a server to consume the data from the streaming server, and deliver it to a dashboard.


```
npm install
```

```
touch .env
```

Place these or your own settings into the .env file with your preferred text editor.
```
PORT='4000'
DB='stream_logging'
COLLECTION='stream_logs'
STREAMING_SERVER_IP='http://10.0.0.117:8000'
SERVER_STATUS_ENDPOINT='/api/server'
SERVER_STREAMS_ENDPOINT='/api/streams'
```

```
npm run build
```

```
npm start
```
