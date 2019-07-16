import { combineReducers } from 'redux';

const reviewsReducer = (reviewList = [], action) => {
    if (action.type === 'REVIEWS_FETCH_SUCCESS') {
        return action.reviews;
    }
    return reviewList;
};

const reviewsLoading = (state = false, action) => {
    if (action.type === 'REVIEWS_LOADING') {
        return action.isLoading;
    }
    return state;
};

const reviewsErrored = (state = false, action) => {
    if (action.type === 'REVIEWS_ERRORED') {
        return action.hasErrored;
    }
    return state;
};

const manageReviewsReducer = (reviewList = [], action) => {
    switch (action.type) {
        case 'ADD_REVIEW_SUCCESS':
            console.log(action.review);
            return [...reviewList, action.review];
        case  'REMOVE_REVIEW_SUCCESS':
            return reviewList.filter(
                review => {
                    return review._id !== action.payload }
            );
        case  'REVIEWS_FETCH_SUCCESS':
            console.log("success in reducer");
            console.log(action.reviews.data);
            return action.reviews.data;
        case 'UPVOTE':
            return reviewList.map(review => {
                if (review._id === action.review._id) {
                    review.rating = action.review.rating;
                }
                return review;
        });
        case 'DOWNVOTE':
            console.log("downvoting");
            console.log(action);
            return reviewList.map(review => {
                if (review._id === action.review._id) {
                    review.rating = action.review.rating;
                }
                return review;
            });
        default:
            return reviewList;
    }
};

const selectedReviewReducer = (selectedReview = null, action) => {
    if (action.type === 'REVIEW_SELECTED') {
        return action.payload;
    }
    return selectedReview;
};

export default combineReducers({
    reviews: reviewsReducer,
    reviewsLoading: reviewsLoading,
    reviewsErrored: reviewsErrored,
    manageReviews: manageReviewsReducer,
    selectedReview: selectedReviewReducer
});