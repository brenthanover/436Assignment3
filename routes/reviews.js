var Review = require('../models/reviews');
var express = require('express');
var router = express.Router();

let review_dummy_data = [
    { reviewName: 'Santa Ono', reviewMessage: 'Brent is a swell guy. I would give him an A.'},
    { reviewName: 'Donald J. Trump', reviewMessage: 'See, this guy, he\'s, I don\'t much care for Brad, when he sits, you see you have to understand, he is not a good guy, so he sits up there up there, you know when he does, on the computer, he isn\'t that smart or bigly smart, not smart like me.'},
    { reviewName: 'Steven Spielberg', reviewMessage: 'There\'s no way that you are going to get a quote from me to put on your website.'},
    { reviewName: 'Brent\'s mom', reviewMessage: 'He\'s such a handsome young man.' }
];

/* GET reviews initial data */
router.get('/', (req, res, next) => {
    console.log("getting");
    Review.find((err, reviews) => {
        if (err) {
            console.log("error in getting data");
            console.log(err);
            return res.json({ success: false, error: err })
        }
        console.log("success in getting data");
        return res.json({ success: true, data: reviews })
    })
});

/* POST reviews. */
router.post('/', (req, res, next) => {
    console.log("POSTING...");
    console.log(req.body.review);
    console.log(req.body.type);
    if (req.body.type == 'UPVOTE') {
        Review.findOneAndUpdate(
            { _id: req.body.review._id },
            { $inc: { rating: 1 } },
            { new: true },
            (err, data) => {
                if (err) {
                    console.log("error upvoting");
                    console.log(err);
                }
            }
        );
        return;
    }
    if (req.body.type == 'DOWNVOTE') {
        Review.findOneAndUpdate(
            { _id: req.body.review._id },
            { $inc: { rating: -1 } },
            { new: true },
            (err, data) => {
                if (err) {
                    console.log("error upvoting");
                    console.log(err);
                }
            }
        );
        return;
    }
    var myData = new Review(req.body.review);
    myData.save()
        .then(item => {
            res.send(myData);
            console.log("saved review");
        })
        .catch(err => {
            console.log(err);
            console.log("unable to save review");
        });
});

/* DELETE review. */
router.delete('/', (req, res, next) => {
   console.log("DELETING...");
    console.log(req.body._id);
   Review.deleteOne({ _id: req.body._id }, (error, review) => {
       if (error) {
           console.log(error);
           return res.json({ success: false, error });
       }
       return res.json({ success: true });
   });
});

module.exports = router;