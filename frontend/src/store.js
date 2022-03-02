import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { issueDetailsReducer, issueReducer } from './reducers/issueReducer';
import { profileReducer, userReducer } from './reducers/userReducer';

const reducer = combineReducers({
    issues: issueReducer,
    issueDetails: issueDetailsReducer,
    user: userReducer,
    profile: profileReducer
});

let initialState = {}

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;