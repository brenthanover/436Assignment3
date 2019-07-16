import axios from 'axios';

export const reviewsErrored = (bool) => {
    return {
        type: 'REVIEWS_ERRORED',
        hasErrored: bool
    };
};

export const isReviewsLoading = (bool) => {
    return {
        type: 'REVIEWS_LOADING',
        isLoading: bool
    };
};

export const reviewsSuccess = (reviews) => {
    return {
        type: 'REVIEWS_FETCH_SUCCESS',
        reviews: reviews
    };
};

export const reviewsFetchData = (url) => {
    return (dispatch) => {
        dispatch(isReviewsLoading(true));
        console.log("fetching...");

        axios.get(url)
            .then((response) => {
                if (!response.data) {
                    throw Error(response.statusText);
                }
                dispatch(isReviewsLoading(false));
                dispatch(reviewsSuccess(response.data));
                return response;
            })
            .catch((err) => {
                console.log("There is an error occurring in fetch reviews action");
                console.log(err);
                dispatch(reviewsErrored(true))
            });
    };
};

export const addReview = (review) => {
    return dispatch => {
        dispatch(addReviewStarted());
        console.log("posting review");
        console.log(review);

        axios
            .post('/reviews', {
                review: review
            })
            .then(res => {
                dispatch(addReviewSuccess(review));
            })
            .catch(err => {
                console.log("There is an error occurring");
                console.log(err);
                dispatch(addReviewFailure(err.message));
            });
    };
};

export const addReviewSuccess = (review) => {
    return {
        type: 'ADD_REVIEW_SUCCESS',
        review: review
    };
};

export const addReviewStarted = () => {
    return {
        type: 'ADD_REVIEW_STARTED'
    }
};

export const addReviewFailure = error => {
    return {
        type: 'ADD_REVIEW_FAILURE',
        payload: error
    }
};

export const removeReviewSuccess = (_id) => {
    return {
        type: 'REMOVE_REVIEW_SUCCESS',
        payload: _id
    };
};

export const removeReview = (_id) => {
    return dispatch => {
        axios
            .delete('/reviews', {
                data: { _id: _id }
            })
            .then(res => {
                console.log("sending action to remove");
                console.log(_id);
                dispatch(removeReviewSuccess(_id));
            })
            .catch(err => {
                console.log(err);
                dispatch(addReviewFailure(err.message));
            });
    };
};

export const selectReview = (review) => {
    return {
        type: 'REVIEW_SELECTED',
        payload: review
    };
};

export const voteFailure = (review) => {
    return {
        type: 'VOTE_FAILURE',
        review: review
    };
};

export const upvoteSuccess = (review) => {
    return {
        type: 'UPVOTE',
        review: review
    };
};

export const upvote = (review) => {
    return dispatch => {
        review.rating += 1;
        dispatch(upvoteSuccess(review));
        axios
            .post('/reviews', {
                type: 'UPVOTE',
                review: review
            })
            .then(res => {
                console.log("successfully upvoted");
                dispatch(upvoteSuccess(review));
            })
            .catch(err => {
                console.log("error in upvoting");
                console.log(err);
                dispatch(voteFailure(review));
            });
    };
};

export const downvoteSuccess = (review) => {
    return {
        type: 'DOWNVOTE',
        review: review
    };
};

export const downvote = (review) => {
    return dispatch => {
        review.rating -= 1;
        dispatch(downvoteSuccess(review));
        axios
            .post('/reviews', {
                type: 'DOWNVOTE',
                review: review
            })
            .then(res => {
                console.log("successfully downvoted");
                dispatch(downvoteSuccess(review));
            })
            .catch(err => {
                console.log("error in downvoting");
                console.log(err);
                dispatch(voteFailure(review));
            });
    };
};


// tutorials from multiple sources
// https://codepen.io/stowball/post/a-dummy-s-guide-to-redux-and-thunk-in-react