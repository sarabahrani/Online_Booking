// Set up your root reducer here...
import { combineReducers } from 'redux';
import form from './reducer';
const rootReducer = combineReducers(
    {
        form,
    }
);
export default rootReducer;