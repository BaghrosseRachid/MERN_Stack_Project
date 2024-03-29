import axios from 'axios';
import {
  REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,
  AUTH_ERROR,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT,CLEAR_PROFILE
} from './types';

import {setAlert} from './alert';
import setAuthToken from '../utils/setAuthToken';
//load the user
export const loadUser = () => async dispatch=>{
   if(localStorage.token)
   {
     setAuthToken(localStorage.token);
   }
   try {
     const res = await axios.get('api/auth');
    
     dispatch({
       type: USER_LOADED,
       payload:res.data
     });
   } catch (err) {
     dispatch({
       type:AUTH_ERROR
     })
   }
}
 
export const register=({ name,email,password})=> async dispatch =>{

 //create the object configuration 
try {
  const config = {
  headers : {
    'Content-type':'application/json'
  }
  
}
const body= JSON.stringify({name,email,password});
//send the request
const res= await axios.post('/api/users',body,config);
//return token as a data
dispatch({
    type: REGISTER_SUCCESS,
    payload:res.data
});
  dispatch(loadUser());


}

catch (err) {
  const errors= err.response.data.errors;
  if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger'))); 
  }
dispatch({
    type:REGISTER_FAIL  ,
    
})
}

}
export const login = ( email,password)=> async dispatch =>{

 //create the object configuration 
try {
  const config = {
  headers : {
    'Content-type':'application/json'
  }
  
}
const body=JSON.stringify({email,password});
//send the request
const res= await axios.post('/api/auth',body,config);
//return token as a data
dispatch({
    type: LOGIN_SUCCESS,
    payload:res.data
});
   dispatch(loadUser());


} catch (err) {
  const errors= err.response.data.errors;
  if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger'))); 
  }
  dispatch({
    type:LOGIN_FAIL   
})
}

}
//log out action
export const logout = () => dispatch =>{
  dispatch({type:CLEAR_PROFILE});
  dispatch({type:LOGOUT});
}


//reset password
export const reset = ( email)=> async dispatch =>{
   

  localStorage.setItem("email",email)
  //create the object configuration 
   const config = {
   headers : {
     'Content-type':'application/json'
   }
  }
 
 const body=JSON.stringify({email});
 //send the request
  await axios.post('/api/auth/reset-password',body,config)
 //return token as a data
 .then((res)=>{
   console.log("into then")
  dispatch(setAlert("Verifier votre email", "success"))
  console.log(res.data);
  
 })
 
 
 .catch ((err) =>{
   const errors= err.response.data.errors;
   if(errors){
       errors.forEach(error => dispatch(setAlert(error.msg,'danger'))); 
   }
   
 })
 
}
//reset password
export const newpassword = ( token,password)=> async dispatch =>{

  //create the object configuration 
   const config = {
   headers : {
     'Content-type':'application/json',
    
   }
  }
 
 const body=JSON.stringify({password});
 //send the request

  await axios.post(`/api/auth/new-password/${token}`,body,config)
 //return token as a data
 .then((res)=>{
   console.log("into then")
  dispatch(setAlert("Mot de passe ré-initialiser avec succés", "success"))
  console.log(res.data);
  
 })
 
 
 .catch ((err) =>{
   const errors= err.response.data.errors;
   if(errors){
       errors.forEach(error => dispatch(setAlert(error.msg,'danger'))); 
   }
   
 })
 
}
