const socketIO = require('socket.io');
const mongoose = require('mongoose');
    
module.exports = function(server) {
    const io = socketIO(server);
    io.on('connection', (client) => {
        client.on('addData', async (data) => { 
            console.log("Joined Conv");
        });

        client.on('disconnect', () => { 
            client.leave(client.room);
        });
    });
}
