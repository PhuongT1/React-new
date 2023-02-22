import { combineReducers } from 'redux';
import posts from './post';
import token from './token';
export default combineReducers({
  posts, token
});