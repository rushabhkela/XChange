var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

/* GET home page. */
router.get('/', async (req, res) => {
  res.render('index', { title: 'XChange' });
});

router.get('/events/:date1/:date2/:event', async (req, res) => {
  if (!req.user) {
    res.redirect('/auth/google');
  }
  else {
    res.render('events', { title: 'XChange', date1: req.params.date1, date2: req.params.date2, event : req.params.event });
  }
});


router.get('/terminal', async (req, res) => {
  if (!req.user) {
    res.redirect('/auth/google');
  }
  else {
    const stocks = await Stock.find({ Symbol: "RELIANCE", Date: { $gte: '2019-01-01', $lte: '2020-02-01' } });
    res.render('simulator', { title: 'XChange', data: stocks });
  }
});

router.get('/getdata/:date1/:date2/:stock', async (req, res) => {
  const stocks = await Stock.find({ Symbol: req.params.stock, Date: { $gte: req.params.date1, $lte: req.params.date2 } });
  res.status(200).json(stocks);
});
router.get('/getnews', async (req, res) => {
  const news = await News.find({});
  var a = Math.floor((Math.random() * 9) + 0);
  var b = Math.floor((Math.random() * 9) + 9);
  var c = Math.floor((Math.random() * 9) + 18);

  var resulta = sentiment.analyze(news[a].Title);
  var resultb = sentiment.analyze(news[b].Title);
  var resultc = sentiment.analyze(news[c].Title);

  if (resulta.score > 0) {
    resulta = "Positive";
  }
  else {
    resulta = "Negative";
  }
  if (resultb.score > 0) {
    resultb = "Positive";
  }
  else {
    resultb = "Negative";
  }
  if (resultc.score > 0) {
    resultc = "Positive";
  }
  else {
    resultc = "Negative";
  }

  var ret = {
    newsa: news[a],
    newsb: news[b],
    newsc: news[c],
    nra: resulta,
    nrb: resultb,
    nrc: resultc
  }

  res.status(200).json(ret);
});

router.get('/getdata/:num', async (req, res) => {
  const stocks = await Stock.find({ Symbol: "RELIANCE", Date: { $gte: '2019-01-01', $lte: '2020-02-01' } }).limit(Number(req.params.num));
  res.status(200).json(stocks);
});

router.get('/visual', async (req, res) => {
  if (!req.user) {
    res.redirect('/auth/google');
  }
  else {
    res.render('visualization', { title: 'XChange' });
  }
});

router.get('/visual/:stock', async (req, res) => {
  if (!req.user) {
    res.redirect('/auth/google');
  }
  else {
    res.render('visualization', { title: 'XChange', stockwithoutBSE: req.params.stock.toUpperCase() });
  }
});





module.exports = router;
