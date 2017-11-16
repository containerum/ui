const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const request = require('request');

const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '50mb'})); // support json encoded bodies
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); // support encoded bodies

function decodeBase64Image(dataString) {
    const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

app.post('/omnidesk', (req, res) => {
    const headers = {
        'Authorization': 'Basic dGhvbXNvbjc3Nzc3QG1haWwucnU6NTNmZDZiZmMzMGE3YzZmZGYyMzViZjE0ZQ==',
        'Content-Type': 'multipart/form-data'
    };
    const formData = {
        'case[content]': req.body.case.content,
        'case[subject]': req.body.case.subject,
        'case[user_email]': req.body.case.user_email,
        'case[group_id]': req.body.case.group_id,
    };

    const arrayOfPaths = [];
    if (req.body.case.base64.length) {
        req.body.case.base64.map((item, index) => {
            const dateId = +new Date;
            const imageBuffer = decodeBase64Image(item);
            arrayOfPaths.push(`${__dirname}/images/${dateId}${req.body.case.files[index]}`);
            fs.writeFile(`${__dirname}/images/${dateId}${req.body.case.files[index]}`, imageBuffer.data, function(err) {
                if (err) throw err;
                formData[`case[attachments][${index}]`] = fs.createReadStream(`${__dirname}/images/${dateId}${req.body.case.files[index]}`);
                if (req.body.case.base64[req.body.case.base64.length - 1] === item) {
                    request.post({
                        url: 'https://exonlab.omnidesk.ru/api/cases.json',
                        headers,
                        formData: formData
                    }, requestCallback);
                }
            });
        });
    } else {
        request.post({
            url: 'https://exonlab.omnidesk.ru/api/cases.json',
            headers,
            formData: formData
        }, requestCallback);
    }

    function requestCallback(err, response, body) {
        if (err) {
            return res.json({
                data: {
                    message: 'Error'
                }
            });
        }
        if (arrayOfPaths.length) {
            arrayOfPaths.map(path => {
                fs.unlinkSync(path);
            });
        }
        if (JSON.parse(body).case) {
            return res.json(JSON.parse(body));
        } else {
            return res.json({
                data: {
                    message: 'Error'
                }
            });
        }
    }
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
    console.log('Omnidesk server listening on port 3001!');
});
