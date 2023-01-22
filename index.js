const express = require('express');
const favicon = require('serve-favicon')
const cors = require('cors');
const ytdl = require('ytdl-core');
const instagramGetUrl = require("instagram-url-direct");
const http = require('http');
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
  res.sendFile(__dirname + '/views/youtube.html');
})

app.get('/ig', (req, res) => {
  res.sendFile(__dirname + '/views/instagram.html');
})

app.post('/yt/download', async (req, res) => {
  try {
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
      res.redirect('/yt')
    }
  }
  catch (err) {
    console.error(err)
  }
})

app.post('/ig/download', async (req, res) => {
  try {
    if (req.body.url.startsWith('https://instagram.com/') || req.body.url.startsWith('http://instagram.com/') || req.body.url.startsWith('http://www.instagram.com/') || req.body.url.startsWith('https://www.instagram.com/')) {
      const links = await instagramGetUrl(req.body.url)
      if (req.body.type === 'mp4') {
        res.redirect(links.url_list[0])
      } else {
        if (req.body.type === 'mp3') {
          res.header('Content-Disposition', 'attachment; filename="' + new Date() + '-Fizzy.mp3"');
          res.write(links.url_list[0], 'binary');
          res.end();
        }
      }
    } else {
      res.redirect('/ig')
    }
  }
  catch (err) {
    console.error(err)
  }
})

app.get('/redirect', (req, res) => {
  res.redirect('https://crummygoddess.com/er1ve5sd?key=e6188672a68270ff022916ce0d547b24')
})

app.get('/robots.txt', function (req, res, next) {
  res.sendFile(__dirname + '/seo/robots.txt')
});

app.get('/sitemap.xml', (req, res) => {
  res.sendFile(__dirname + '/seo/sitemap.xml')
})

app.get('*', (req, res) => {
  res.redirect('/yt')
})