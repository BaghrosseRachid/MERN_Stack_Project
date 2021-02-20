import  { Fragment, useState } from 'react'
import {fragment} from 'react'
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import {login} from '../../actions/auth';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import auth from '../../reducers/auth';


const Login = ({login,isAuthenticated}) => {
    const [formData,setFormData]= useState({
        
        email:'',
        password:'',
        
    });
    const {email,password} = formData;

    const onChange= e => setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit=  e=>{
        e.preventDefault();//empêcher l'actualisation de la page aprés submit
          login(email,password);
        }
        //redirect if login
        if (isAuthenticated) {
          return <Redirect to= "/dashboard"></Redirect>
        }
    
    return (

       <Fragment>
           <h1 className="large text-primary">Se Connecter</h1>
      <p className="lead"><i className="fas fa-user"></i> Connectez à Votre Compte</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
       
        <div className="form-group">
          <input type="email" placeholder="Address Email" name="email" 
           value={email}
           onChange={e=> onChange(e)} 
           
          />
          
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={password}
            onChange={e=> onChange(e)} 
          />
        </div>
      
        <input type="submit" className="btn btn-primary" value="Connecter" />
      </form>
      <p className="my-1">
        
Vous n'avez pas  un compte? <Link to="/register">S'enregistrer</Link>
   </p>


       </Fragment>
    )
}
Login.prototype = {
  login : PropTypes.func.isRequired,
  isAuthenticated : PropTypes.bool,
}
// create mapstatetoprops to access to the state of auth reducer
const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated,

});

export default connect(mapStateToProps,{login})(Login)

