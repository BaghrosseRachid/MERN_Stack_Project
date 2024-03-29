import {
    
    REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERROR,
     LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT, DELETE_ACOUNT
    
    } from '../actions/types';

const initialState={
    // storage the token that we get back
token : localStorage.getItem('token'),
//auth success=> true else false
isAuthenticated :null,
// make sure that the loading is done  false=> means that the data has been loaded
loading: true,
// user object where we will store the user informations
user : null
}
export default function(state=initialState,action){
    const {type,payload}=action;

    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS :
            //put the token in the locale storage
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading : false
            }
        case USER_LOADED:
     
            return {
                ...state,
                isAuthenticated: true,
                loading : false,
                user:payload
            }
           
            case REGISTER_FAIL:
            case AUTH_ERROR: 
            case LOGIN_FAIL:
            case LOGOUT :
            case DELETE_ACOUNT :
                localStorage.removeItem('token');
                return {
                    ...state,
                    token:null,
                    isAuthenticated:false,
                    user:null,
                    loading : false
                }
        default:
            return state;
    }
}