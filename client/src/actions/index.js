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
            .post('http://localhost:5000/reviews', {
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

export const addReviewStarted = () => ({
    type: 'ADD_REVIEW_STARTED'
});

export const addReviewFailure = error => ({
    type: 'ADD_REVIEW_FAILURE',
    payload: {
        error
    }
});

export const removeReviewSuccess = (reviewName) => {
    return {
        type: 'REMOVE_REVIEW_SUCCESS',
        payload: reviewName
    };
};

export const removeReview = (reviewName) => {
    return dispatch => {
        axios
            .delete('http://localhost:5000/reviews', {
                data: { reviewName: reviewName }
            })
            .then(res => {
                console.log("sending action to remove");
                console.log(reviewName);
                dispatch(removeReviewSuccess(reviewName));
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


// tutorials from multiple sources
// https://codepen.io/stowball/post/a-dummy-s-guide-to-redux-and-thunk-in-react