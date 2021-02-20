import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile'
//inside this methode we will make the  sevral reducer
export default combineReducers({
alert,
auth,
profile

});
