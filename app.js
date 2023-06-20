require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);
const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_TOKEN);
const PORT = process.env.PORT || 80;

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public'));

io.set('resource', `/${process.env.SOCKET_PATH}`);
io.sockets.on('connection', function (socket) {
});

app.post('/slack', async function (req, res) {

  const { type, event } = req.body;
  if (type === 'challenge') {
  } else if (type === 'event_callback') {
    console.log(event);
    const result = await web.conversations.info({
      channel: event.channel
    });

    console.log(result.channel.name)

    io.sockets.emit(result.channel.name, event.text);
  }

  res.status(200).json(req.body);

});

app.post('/comment', async function (req, res) {
  if (req.body.comment.length >= 100) {
    res.status(400).json();
    return;
  }
  io.sockets.emit('form', req.body.comment);
  res.status(204).json();
});

app.get('/test', async function (req, res) {
  console.log("test");
  io.sockets.emit('message', "てすと");

  res.send({ test: "てすと" });

});

http.listen(PORT, function () {
  console.log('server listening. Port:' + PORT);
});