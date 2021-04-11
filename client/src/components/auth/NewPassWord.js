import  { Fragment, useState } from 'react'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {newpassword} from '../../actions/auth';
import PropTypes from 'prop-types';


const NewPassWord = ({setAlert,newpassword,match}) => {
const Token = match.params.token;


    const [formData,setFormData]= useState({
    
        password:'',
        password2: ''
    });
    const {password,password2} = formData;

    const onChange= e => setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit=  e=> {
   
        e.preventDefault();//empêcher l'actualisation de la page aprés submit
     
        if(password!==password2){
            
          setAlert('mot de passe incorrect','danger');
      }
        else {
             newpassword(Token,password);
             return <Redirect to='/dashboard'></Redirect>
        }
    }
     
        
    
    return (

       <Fragment>
           <h1 className="large text-primary">Mot de passe</h1>
      <p className="lead"><i className="fas fa-user"></i>Entrer un nouveau mot de passe</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
      
       
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
     
       </Fragment>
    )
}
NewPassWord.propTypes={
  setAlert : PropTypes.func.isRequired,
  newpassword: PropTypes.func.isRequired,
 
}

export default connect(null,{setAlert,newpassword})(NewPassWord);
