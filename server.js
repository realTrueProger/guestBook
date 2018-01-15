const express = require('express');             //подключаем express
const hbs = require('hbs');                     //подключаем hbs
const mongoose = require('./db/mongoose');      //подключаем mongoose
const bodyParser = require('body-parser');      //подключаем body-parser
const {Comment} = require('./models/comment');  //подключаем модель Comment для Mongoose


// настройка Express

const app = express();      // запускаем Express
app.use(express.static(__dirname + '/public'));    // подключаем статические файлы
app.set('view engine', 'hbs');      // подключаем hbs
app.use( bodyParser.json() );       // bodyParser для JSON-encoded
app.use(bodyParser.urlencoded({     // bodyParser для URL-encoded
    extended: true
}));

hbs.registerPartials(__dirname + '/views/partials');  // шаблоны hbs

// корневой маршрут

app.get('/', (req, res) => {
    // выгружаем все записи из БД
    Comment.find().then((allComments) => {
        // рендерим
        res.render('gb.hbs', {allComments});
    }, (err) => {
        console.log(err);
    });
});

// запись в БД

app.post('/addComment', ( req, res)=>{
    let newComment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    newComment.save().then((doc)=>{
        console.log(doc);
    }, (e)=>{
        console.log(e);
    });
    res.redirect('/');
});


// запуск веб сервера

app.listen(8080, ()=> {
    console.log('app start at port 8080');
});





