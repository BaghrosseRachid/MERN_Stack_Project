import  { Fragment, useState } from 'react'
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reset} from '../../actions/auth'



const Rest = ({reset}) => {
    const [formData,setFormData]= useState({
        
        email:'',
        
    });
    const {email} = formData;

    const onChange= e => setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit=  e=>{
        e.preventDefault();//empêcher l'actualisation de la page aprés submit
          reset(email);
          return <Redirect to='/login'></Redirect>
        }
       

    
    
    return (

       <Fragment>
           <h1 className="large text-primary">ré-initialiser votre mote de passe</h1>
      <p className="lead"><i className="fas fa-user"></i> Entrer votre email</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
       
        <div className="form-group">
          <input type="text" placeholder="Address Email" name="email" 
           value={email}
           onChange={e=> onChange(e)} 
           
          />
          
        </div>
  
      
        <input type="submit" className="btn btn-primary" value="Envoyer" />
      </form>
      
       </Fragment>
    )
}
            Rest.prototype = {
            rest : PropTypes.func.isRequired,
       
            }
         
           

export default connect(null,{reset})(Rest)

