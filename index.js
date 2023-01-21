const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.use(cors());

app.listen(3003, () => {
    console.log('Server is up');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/yt/download', async (req, res) => {
    if (req.body.url && ytdl.validateURL(req.body.url)) {
        res.header('Content-Disposition', 'attachment; filename="' + new Date() + '-Fizzy.mp4"');
        ytdl(req.body.url, { format: 'mp4', quality: '18', filter: 'video' }).pipe(res);
    } else {
        res.redirect('/')
    }
})