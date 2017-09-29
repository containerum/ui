'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const fs = require('fs');
const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');
const paths = require('../config/paths');
const config = require('../config/webpack.config.dev');
const createDevServerConfig = require('../config/webpackDevServer.config');

const useYarn = fs.existsSync(paths.yarnLockFile);
const isInteractive = process.stdout.isTTY;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}


// var server = require('http').createServer();
// var io = require('socket.io')(server);
// io.on('connection', function(socket){
//     console.log('a user connected');
//     socket.on('chat message', function(msg){
//         io.emit('chat message', msg);
//     });
//     socket.on('disconnect', function(){
//         console.log('user disconnected');
//     });
// });
// server.listen(3001);

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/omnidesk', (req, res) => {
    // axios.post(
    //     'https://exonlab.atlassian.net/rest/servicedeskapi/request',
    //     {
    //         'serviceDeskId': "1",
    //         'requestParticipants': [ 'avlasov' ],
    //         'requestTypeId': "1",
    //         'requestFieldValues': {
    //             'summary': 'user_email = ' + req.body.case.user_email + '; subject = ' + req.body.case.subject,
    //             'description': 'content = ' + req.body.case.content + '; group_id = ' + req.body.case.group_id
    //         }
    //     },
    //     {
    //         headers: {
    //             Authorization: 'Basic YmFzay01QHlhbmRleC5ydTpJbV9hX0xlY2g1cg==',
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         validateStatus: (status) => status >= 200 && status <= 505
    //     }
    // );
    axios.post(
        'https://exonlab.omnidesk.ru/api/cases.json',
        req.body,
        // { "case": { "user_email":"", "user_full_name":"User\u0027s full name", "subject":"I need help", "content":"I need help", "language_id":2 } },
        {
            headers: {
                'Accept': '*/*',
                Authorization: 'Basic dGhvbXNvbjc3Nzc3QG1haWwucnU6NTNmZDZiZmMzMGE3YzZmZGYyMzViZjE0ZQ==',
                'Content-Type': 'application/json'
            },
            validateStatus: (status) => status >= 200 && status <= 505
        }
    )
    .then(response => {
        if (response.status === 201) {
            return res.json(response.data);
        } else {
            return res.json({
                data: {
                    message: 'Error'
                }
            });
        }
    }).catch(err => console.log(err));
});
app.get('/group_omnidesk', (req, res) => {
    axios.get(
        'https://exonlab.omnidesk.ru/api/groups.json?limit=50&page=2',
        {
            headers: {
                'Accept': '*/*',
                Authorization: 'Basic dGhvbXNvbjc3Nzc3QG1haWwucnU6NTNmZDZiZmMzMGE3YzZmZGYyMzViZjE0ZQ==',
                'Content-Type': 'application/json'
            },
            validateStatus: (status) => status >= 200 && status <= 505
        }
    )
    .then(response => {
        if (response.status === 200) {
            return res.json(response.data);
        } else {
            return res.json({
                data: {
                    message: 'Error'
                }
            });
        }
    }).catch(err => console.log(err));
});
app.listen(3001, () => {
    console.log('Example app listening on port 3001!');
});


// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// We attempt to use the default port but if it is busy, we offer the user to
// run on a different port. `detect()` Promise resolves to the next free port.
choosePort(HOST, DEFAULT_PORT)
  .then(port => {
    if (port == null) {
      // We have not found a port.
      return;
    }
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const appName = require(paths.appPackageJson).name;
    const urls = prepareUrls(protocol, HOST, port);
    // Create a webpack compiler that is configured with custom messages.
    const compiler = createCompiler(webpack, config, appName, urls, useYarn);
    // Load proxy config
    const proxySetting = require(paths.appPackageJson).proxy;
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic);
    // Serve webpack assets generated by the compiler over a web sever.
    const serverConfig = createDevServerConfig(
      proxyConfig,
      urls.lanUrlForConfig
    );
    const devServer = new WebpackDevServer(compiler, serverConfig);
    // Launch WebpackDevServer.
    devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }
      if (isInteractive) {
        clearConsole();
      }
      console.log(chalk.cyan('Starting the development server...\n'));
      openBrowser(urls.localUrlForBrowser);
    });

    ['SIGINT', 'SIGTERM'].forEach(function(sig) {
      process.on(sig, function() {
        devServer.close();
        process.exit();
      });
    });
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
