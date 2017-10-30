const app = require('./app')

const PORT = process.env.PORT || 3000

// Why don't I need http createServer
app.listen(PORT, ()=>{
  console.log(`App listening on port ${PORT}!`)
})
app.on('error', onError);

// Start Omnidesk server
// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const appOmni = express();
// appOmni.use(cors());
// appOmni.use(bodyParser.json()); // support json encoded bodies
// appOmni.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//
// appOmni.post('/omnidesk', (req, res) => {
//     axios.post(
//         'https://exonlab.omnidesk.ru/api/cases.json',
//         req.body,
//         {
//             headers: {
//                 'Accept': '*/*',
//                 Authorization: 'Basic dGhvbXNvbjc3Nzc3QG1haWwucnU6NTNmZDZiZmMzMGE3YzZmZGYyMzViZjE0ZQ==',
//                 'Content-Type': 'application/json'
//             },
//             validateStatus: (status) => status >= 200 && status <= 505
//         }
//     )
//     .then(response => {
//         if (response.status === 201) {
//             return res.json(response.data);
//         } else {
//             return res.json({
//                 data: {
//                     message: 'Error'
//                 }
//             });
//         }
//     }).catch(err => console.log(err));
// });
//
// appOmni.get('/group_omnidesk', (req, res) => {
//     axios.get(
//         'https://exonlab.omnidesk.ru/api/groups.json?limit=50&page=2',
//         {
//             headers: {
//                 'Accept': '*/*',
//                 Authorization: 'Basic dGhvbXNvbjc3Nzc3QG1haWwucnU6NTNmZDZiZmMzMGE3YzZmZGYyMzViZjE0ZQ==',
//                 'Content-Type': 'application/json'
//             },
//             validateStatus: (status) => status >= 200 && status <= 505
//         }
//     )
//     .then(response => {
//         if (response.status === 200) {
//             return res.json(response.data);
//         } else {
//             return res.json({
//                 data: {
//                     message: 'Error'
//                 }
//             });
//         }
//     }).catch(err => console.log(err));
// });
// appOmni.listen(3001, () => {
//     console.log('Omnidesk server listening on port 3001!');
// });
// End Omnidesk server

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

