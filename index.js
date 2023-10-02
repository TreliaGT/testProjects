const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var data = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
//io.emit('some event', { someProperty: 'some value', someProperty: 'other value' , otherProperty: 'other value'}); // This will emit the event to all connected sockets




io.on('connection', (socket) => {
   socket.on('name', (name , colour) => {
		io.emit('create game', name , colour);
		console.log(data.length);
		io.emit('load players', data);
		data[name] = [colour , '0' , '0'];
		console.log(data);
	});	
		
	socket.on('movement' , (type , input) => {
		io.emit('movement', type , input);
		switch(type) {
		  case 'up':
			if(data[input][1] != 0){
				data[input][1] =  parseInt(data[input][1]) - 1;
			 }
			break;
		  case 'down':
			  if(data[input][1] != 190){
				data[input][1] =  parseInt(data[input][1]) + 1;
			  }
			break;
			case 'left':
			 if(data[input][2]  != 0){
				data[input][2] =  parseInt(data[input][2]) - 1;
			  
			  }
			break;
			case 'right':
			  if(data[input][2]  != 190){
					data[input][2] =  parseInt(data[input][2]) + 1;
			  }
			break;
		}
	});	
	
});




http.listen(3000, () => {
  console.log('listening on *:3000');
});