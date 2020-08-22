import { combineReducers } from 'redux';

import auth from './auth';
import terminals from './terminals';
import buyers from './buyers';

export default combineReducers({
    auth,
    terminals,
    buyers
})