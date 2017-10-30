const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/omnidesk', (req, res) => {
    axios.post(
        'https://exonlab.omnidesk.ru/api/cases.json',
        req.body,
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
    console.log('Omnidesk server listening on port 3001!');
});
