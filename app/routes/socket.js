/*
 * Serve content over a socket
 */

module.exports = function (socket) {

	// broadcast a user's message to other users
  socket.on('send:message', function (data) {
    socket.broadcast.emit('send:message', data.message);
  });

  setInterval(function () {
    socket.emit('send:time', {
      time: (new Date()).toString()
    });
  }, 1000);
};
