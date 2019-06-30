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
        console.log(reviews);
        return res.json({ success: true, data: reviews })
    })
});

/* POST reviews. */
router.post('/', (req, res, next) => {
    console.log("POSTING...");
    console.log(req.body);
    var myData = new Review(req.body.review);
    myData.save()
        .then(item => {
            res.send(item);
            console.log("saved new review");
        })
        .catch(err => {
            console.log(err);
            console.log("unable to save new review");
        });
});

/* DELETE review. */
router.delete('/', (req, res, next) => {
   console.log("DELETING...");
   console.log(req.body.reviewName);
   Review.remove({ reviewName: req.body.reviewName }, (error, review) => {
       if (error) {
           console.log(error);
           return res.json({ success: false, error });
       }
       return res.json({ success: true });
   });
});

/* POST MESSAGE -TYPE INTO TERMINAL
 * not quite working, formatting is slightly off. should be "review: {reviewName, message}"
 * curl -d "reviewName=a&reviewMessage=b" -X POST localhost:5000/reviews
 */

/* DELETE MESSAGE -TYPE INTO TERMINAL
 *
 *curl -X POST -d "reviewName=Santa Ono" localhost:5000/reviews
 */


module.exports = router;