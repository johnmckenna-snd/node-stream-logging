# node-stream-logging
a node server that logs the streaming server api into mongodb, and serves the data to a dashboard

## welcome!
I wanted a server to consume the data from the streaming server i had to deliver it to a dashboard. All the settings can be configured in server.js

```javascript
const port = 4000;
const db = 'stream_logging';
const collection = 'stream_logs';
const streamingServerIP = 'http://10.0.0.117:8000';
```

```
npm install
```

```
npm run build
```

```
npm start
```
