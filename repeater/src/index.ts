import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import socketIO from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const key = process.env.REPEATER_SECRET_KEY || 'SomeKeyGoesHere';

app.use(bodyParser.json());
server.listen(8080);
console.log('Server listening on port 8080');

// Emit stream information to clients when they connect.
io.on('connection', (socket) => {
  console.log(`Client connected with ID ${socket.id}`);
});

// A GET in case you need to check the server is running.
app.get('/', (req, res) => {
  res.send('Running OK');
});

// This is where the tracker postbacks are received.
app.post('/', (req, res) => {
  // Reject POSTs without the correct key.
  if (req.query.key !== key) {
    res.sendStatus(403);
    return;
  }

  // Donation pushes, from when they are approved to be shown on stream.
  if (req.body.message_type === 'donation_push') {
    // Remove the comment if it wasn't approved.
    if (req.body.comment_state !== 'APPROVED') {
      req.body.comment = '';
    }

    // Constructing the data to be sent.
    const data = {
      event: req.body.event,
      id: req.body.id,
      donor_visiblename: req.body.donor_visiblename,
      amount: req.body.amount,
      comment_state: req.body.comment_state,
      comment: req.body.comment,
      time_received: req.body.time_received,
    };

    // Emit this data over the sockets.
    io.emit('donation', data);
    console.log('EMIT donation:', JSON.stringify(data));
  }

  // Donation total change, when the total goes up when a payment is confirmed.
  if (req.body.message_type === 'donation_total_change') {
    // Constructing the data to be sent.
    const data = {
      event: req.body.event,
      id: req.body.id,
      amount: req.body.amount,
      new_total: req.body.new_total,
    };

    // Emit this data over the sockets.
    io.emit('total', data);
    console.log('EMIT total:', JSON.stringify(data));
  }

  res.sendStatus(200);
});
