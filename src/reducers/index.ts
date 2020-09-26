import { combineReducers } from 'redux';
import pocketReducer from './pocketReducer';

export default combineReducers({
  pocket: pocketReducer,
});