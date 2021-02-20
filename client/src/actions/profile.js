
import axios from 'axios';
import {setAlert} from './alert';
import {PROFILE_ERROR,GET_PROFILE} from './types'

//get profile function

export const getCurrentProfile = () =>  async dispatch =>{
    //send request to back end for geting the profile user
    
    try {
        const res = await axios.get('api/profile/me');
        
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (err) {
        console.log(err.message);
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText,status: err.response.status}
        })
    }
}

// create or update profile 
export const createProfile=(formData,history,edit=false)=>  async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
const res = await axios.post('/api/profile',formData,config);

dispatch({
    type:GET_PROFILE,
    payload:res.data
});
dispatch(setAlert(edit ? 'Profile Edited' : 'Profile Created','success'));

if(!edit){
    history.push('/dashboard');
}
    } catch (err) {
        const errors= err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger'))); 
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText,status: err.response.status}
        })
    }
}