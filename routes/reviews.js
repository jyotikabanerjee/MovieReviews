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

var revSchema = mongoose.Schema({
    email: {type: String, required:true},
    review: {type: String, required:true},
    movieid: {type: Number, required:true}
});

var Review = mongoose.model('Review', revSchema);
//Model name is Review - database name will be reviews in MongoDB

router.get('/', function (req, res) {
    res.render('review');
});

// todo: backend data validation
// check mongoose for validation and build on top it to avoid malicious entries into the database
router.post('/', function (req, res) {
    /*console.log(req.body);*/

    (new Review({
        email: req.body.email,
        review: req.body.review,
        movieid: Number(req.body.movieid)
    })).save(function (err,data) {
            /*console.log(err);
            console.log(data);*/
            if (err) {
                res.json(500, { message: 'Could not connect to the database.'});
            } else {
                res.json(200, { message: 'Succesfully updated data ... ' });
            }
        });
});


router.get('/:id', function(req,res){
    var i = req.params.id;
  /*console.log(req.params.id);*/
    Review.find({'movieid': i}, 'email review', function(err,docs){
        res.json(docs);
    });

});

module.exports = router;