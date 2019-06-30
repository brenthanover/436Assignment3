import React from 'react';
import '../style/Reviews.css'
import { connect } from 'react-redux';
import AddReview from "./AddReview"
import ReviewDetail from './ReviewDetail'
import Spinner from './Spinner'
import { removeReview, selectReview, reviewsFetchData } from '../actions'

class Reviews extends React.Component {



    componentDidMount() {
        this.props.fetchData('http://localhost:5000/reviews');
    }

    renderReviews() {
        console.log("rendering reviews");
        console.log(this.props.reviewList);
        return this.props.reviewList.map((review) => {
            return (
                <div className={"review"}>
                    <div className="quoter">
                        { review.reviewName }
                    </div>
                    <button
                        className="ui button primary"
                        onClick={() => this.props.removeReview(review.reviewName)}
                    >
                        Remove review
                    </button>
                    <button
                        className="ui button primary"
                        onClick={() => this.props.selectReview(review)}
                    >
                        Review Details
                    </button>
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
        selectReview: (review) => dispatch(selectReview(review))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);