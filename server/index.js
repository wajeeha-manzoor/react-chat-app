const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


io.on('connection', socket => {

  console.log(`socket connected`)

  socket.on('message', receivedMessage => { //RECEIVE 
    io.sockets.emit('broadcast', receivedMessage); //BROADCAST

    // console.log(`${JSON.stringify(receivedMessage)}`)
  })

})



http.listen(5000, function () {
  console.log('listening on port 5000')
})
