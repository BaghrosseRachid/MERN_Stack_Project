//function take token in parametre and it will
// add it in thr headers if there is a token or 
//deleted from the headers if there is no token
import axios from 'axios';
// the goal is sending the token with every request instead
// of picking and choosing which request to send it with

const setAuthToken= token=>{
if (token) {
        //add  the token to the globale headers

    axios.defaults.headers.common['x-auth-token']=token;

    
} else {
    //delete the token from the globale headers
    delete axios.defaults.headers.common['x-auth-token'];
     
}

}
export default setAuthToken;