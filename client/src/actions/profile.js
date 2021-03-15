
import axios from 'axios';
import {setAlert} from './alert';
import {PROFILE_ERROR,GET_PROFILE,GET_PROFILES,UPDATE_PROFILE, DELETE_ACOUNT,CLEAR_PROFILE,GET_REPOS} from './types'

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
//get profiles

export const getProfiles = () =>  async dispatch =>{
//when they go to the profile list page i want to clear what ever in the current profile 
     
    try {
        const res = await axios.get('/api/profile');
        
        dispatch({
            type:GET_PROFILES,
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


//get profile by id

export const getProfileById= userId =>  async dispatch =>{
   
        try {
            const res = await axios.get(`/api/profile/user/${userId}`);
           
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
//get user github repos

export const getGithubRepos= username =>  async dispatch =>{
     
        try {
            const res = await axios.get(`/api/profile/github/${username}`);
            
            dispatch({
                type:GET_REPOS,
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
dispatch(setAlert(edit ? 'Votre profile a été modifié avec succès' : 'Votre profile a été créé  avec succès','success'));

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

//add Experience action 

export const addExperience =(formData,history)=> async dispatch=> {
    try {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
const res = await axios.put('/api/profile/experience',formData,config);

dispatch({
    type:UPDATE_PROFILE,
    payload:res.data
});
dispatch(setAlert('Votre experience a été ajoutée avec succès','success'));


    history.push('/dashboard');

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
//add education action 
export const addEducation =(formData,history)=> async dispatch=> {
    try {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
const res = await axios.put('/api/profile/education',formData,config);

dispatch({
    type:UPDATE_PROFILE,
    payload:res.data
});
dispatch(setAlert('Votre education a été ajoutée avec succès','success'));


    history.push('/dashboard');

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
//delete experience 

export const deleteExperience= id => async dispatch=> {
    if(window.confirm('vous voulez vraiment supprimer cette experience ?'))
   {
        try {
        const res= await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Votre experience a été supprimer avec succès','success'));
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText,status: err.response.status}
        })
    }
    

}

}


//delete EDUCATION

export const deleteEducation= id=> async dispatch=>{
    if(window.confirm('vous voulez vraiment supprimer cette education ??'))
   {
        try {
        const res= await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Votre education a été supprimée avec succès','success'));
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText,status: err.response.status}
        })
    }
    

}

}

//delete acount

export const deleteAcount= ()=> async dispatch=>{
    if(window.confirm('vous voulez vraiment supprimer votre compte'))
   {
        try {
        const res= await axios.delete(`/api/profile`);

        dispatch({
            type: CLEAR_PROFILE,
        })
        dispatch({  type: DELETE_ACOUNT })

        dispatch(setAlert('Votre compte a été supprimé'));
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText,status: err.response.status}
        })
    }
    

}

}

