const express = require('express');
const favicon = require('serve-favicon')
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

app.use(favicon(path.join(__dirname, 'favicon.png')));

app.listen(3001, () => {
    console.log('Server is up');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/yt/download', async (req, res) => {
    if (req.body.url && ytdl.validateURL(req.body.url)) {
        if (req.body.type === 'mp3') {
            res.header('Content-Disposition', 'attachment; filename="' + new Date() + '-Fizzy.mp3"');
            ytdl(req.body.url, { format: 'mp3', filter: 'audioandvideo', quality: 'highest' }).pipe(res);
        } else {
            if (req.body.type === 'mp4') {
                res.header('Content-Disposition', 'attachment; filename="' + new Date() + '-Fizzy.mp4"');
                ytdl(req.body.url, { format: 'mp4', filter: 'audioandvideo', quality: 'highest' }).pipe(res);
            }
        }
    } else {
        res.redirect('/')
    }
})

app.get('/redirect', (req, res) => { 
  res.redirect('https://www.highcpmrevenuenetwork.com/er1ve5sd?key=e6188672a68270ff022916ce0d547b24')
})