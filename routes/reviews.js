var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

/*
var reviewSchema = mongoose.Schema({
    id: Number,
    email: String,
    review: String
});*/


var Review = mongoose.model('Review', {
    email: 'string',
    review: 'string',
    movieid: 'number'
});


router.get('/', function (req, res) {
    res.render('review');
});

// todo: backend data validation
// check mongoose for validation and build on top it to avoid malicious entries into the database
router.post('/', function (req, res) {
    console.log(req.body);

    (new Review({
        email: req.body.email,
        review: req.body.review,
        movieid: Number(req.body.movieid)
    })).save(function (err,data) {
            console.log(err);
            console.log(data);
            if (err) {
                res.json(500, { message: 'Could not connect to the database.'});
            } else {
                res.json(200, { message: 'Succesfully updated data ... ' });
            }
        });
});

module.exports = router;