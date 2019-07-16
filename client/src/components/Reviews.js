import React from 'react';
import '../style/Reviews.css'
import { connect } from 'react-redux';
import AddReview from "./AddReview"
import ReviewDetail from './ReviewDetail'
import Spinner from './Spinner'
import 'semantic-ui-css/semantic.min.css'
import { removeReview, selectReview, reviewsFetchData, upvote, downvote } from '../actions'

class Reviews extends React.Component {



    componentDidMount() {
        this.props.fetchData('/reviews');
    }

    renderReviews() {
        console.log("rendering reviews");
        console.log(this.props.reviewList);
        return this.props.reviewList.map((review) => {
            return (
                <div className="ui cards">
                    <div className="card">
                        <div className="content">
                            <div className="rating">
                                { review.rating }
                            </div>
                            <div className="header">
                                { review.reviewName }
                            </div>
                            <button
                                className="ui button primary"
                                onClick={() => this.props.removeReview(review._id)}
                            >
                                Remove
                            </button>
                            <button
                                className="ui button primary"
                                onClick={() => this.props.selectReview(review)}
                            >
                                Details
                            </button>
                            <br/>
                            <br/>
                            <div className="description">
                                Was this review helpful? Please rate it:
                            </div>
                        </div>
                        <div className="extra content">
                            <div className="ui two buttons">
                                <button
                                    className="ui basic green button"
                                    onClick={() => this.props.upvote(review)}
                                >
                                    ++
                                </button>
                                <button
                                    className="ui basic red button"
                                    onClick={() => this.props.downvote(review)}
                                >
                                    --
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            );
        });
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! Error rendering</p>
        }

        if (this.props.isLoading) {
            return <div align="center">
                <Spinner/>
                <p>Loading...</p>
            </div>
        }

        return (
            <div className="">
                <div className="">
                    <div className="gridview">
                        <div className="review-list">
                            { this.renderReviews() }
                        </div>
                    </div>

                    <div className="gridview">
                        <AddReview />
                        <ReviewDetail />
                    </div>
                </div>

            </div>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        reviewList: state.manageReviews,
        hasErrored: state.reviewsErrored,
        isLoading: state.reviewsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(reviewsFetchData(url)),
        removeReview: (reviewName) => dispatch(removeReview(reviewName)),
        selectReview: (review) => dispatch(selectReview(review)),
        upvote: (_id) => dispatch(upvote(_id)),
        downvote: (_id) => dispatch(downvote(_id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);