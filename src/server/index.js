const http = require('http')

const PORT = 8000
const HOST = 'localhost'

const requestListener = function(req, res) {
  res.end(JSON.stringify({ Saludo: 'holi' }))
  // res.writeHead(200);
  // res.end('Holi');
}

const server = http.createServer(requestListener)
server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
})
