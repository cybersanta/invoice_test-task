import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { save } from 'redux-localstorage-simple'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    rootReducer, 
    {}, 
    composeEnhancers(
        applyMiddleware(thunk, save({ namespace: 'invoice_test-task'}))
    )
)