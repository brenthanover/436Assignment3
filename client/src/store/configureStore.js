import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
}

// tutorial from https://codepen.io/stowball/post/a-dummy-s-guide-to-redux-and-thunk-in-react