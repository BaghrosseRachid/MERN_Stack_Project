import  { Fragment, useState } from 'react'
import {fragment} from 'react'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types';
import validator from 'validator'

const Register = ({setAlert,register,isAuthenticated}) => {
    const [formData,setFormData]= useState({
        name: '',
        email:'',
        password:'',
        password2: ''
    });
    const {name,email,password,password2} = formData;

    const onChange= e => setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit=  e=> {
        e.preventDefault();//empêcher l'actualisation de la page aprés submit
     
        if(password!==password2){
            
          setAlert('mot de passe incorrect','danger');
      }
        else {
             register({name,email,password});
        }
    }
      if (isAuthenticated) {
        return <Redirect to='/dashboard'></Redirect>
        
      }

    return (

       <Fragment>
           <h1 className="large text-primary">S'enregistrer</h1>
      <p className="lead"><i className="fas fa-user"></i> Créer Votre Compte</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Nom" name="name" 
          value={name}
          onChange={e=> onChange(e)} 
           />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Address Email" name="email" 
           value={email}
           onChange={e=> onChange(e)} 
           
          />
          <small className="form-text"
            >
            Ce site utilise Gravatar donc si vous voulez une image de profil, utilisez un
                        Email Gravatar</small>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirmez le mot de passe"
            name="password2"
            value={password2}
            onChange={e=> onChange(e)} 
           
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Enregistrer" />
      </form>
      <p className="my-1">
        
Vous avez déjà un compte? <Link to="/login">Se Connecter</Link>
   </p>
       </Fragment>
    )
}
Register.propTypes={
  setAlert : PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}
const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated,

});
export default connect(mapStateToProps,{setAlert,register})(Register);
