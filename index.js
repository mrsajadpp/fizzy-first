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

app.use(favicon(path.join(__dirname, '/assets/images/', 'favicon.png')));

app.listen(3001, () => {
    console.log('Server is up');
});

app.get('/yt', (req, res) => {
    res.sendFile(__dirname + '/views/youtube.html')
})

app.post('/yt/download', async (req, res) => {
  try{
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
  }
  catch(err) {
    console.error(err)
  }
})

app.get('/redirect', (req, res) => { 
  res.redirect('https://crummygoddess.com/er1ve5sd?key=e6188672a68270ff022916ce0d547b24')
})

app.get('/robots.txt', function (req, res, next) {
    res.type('text/plain')
    res.send("User-agent: *\nAllow: /");
});

app.get('*', (req, res) => {
  res.redirect('/yt')
})