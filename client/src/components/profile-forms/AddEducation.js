import React,{Fragment,useState} from 'react'
import PropTypes from 'prop-types'
import {Link,Redirect,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {addEducation} from '../../actions/profile'

const AddEducation = ({addEducation,history}) => {
const [formData,setFormData] =useState({

    school:'',
    degree:'',
    fieldofstudy:'',
    from:'',
    current:false,
    to:'',
    description:''
})

const {
    school,
    degree,
    fieldofstudy,
    from,
    current,
    to,
    description
}=formData;
//check if the current checkbox is checked 

const [toDateDisabled,toggleDisabled]=useState(false);

const onChange =e => setFormData({...formData,[e.target.name]:e.target.value});

    return (
        <Fragment>
            <h1 className="large text-primary" >
       Ajouter une Education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Ajouter n’importe quelle école, que vous avez assisté
      </p>
      <small>* = Champs requis </small>

      <form className="form" onSubmit={ e=>{
          e.preventDefault();
          addEducation(formData,history)}}>

        <div className="form-group">
          <input type="text" placeholder="* Ecole " name="school" value={school} 
          onChange={e=>onChange(e)} required />
        </div>

        <div className="form-group">
          <input type="text" placeholder="*  Diplôme ou certificat" name="degree" value={degree} 
          onChange={e=>onChange(e)}  required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Domaine d'étude " name="fieldofstudy" value={fieldofstudy} 
          onChange={e=>onChange(e)} />
        </div>
        <div className="form-group">
          <h4>De la date</h4>
          <input type="date" name="from" value={from}
           onChange={e=>onChange(e)}/>
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" checked={current} value={current}
           onChange={e=>{
                setFormData({...formData,current:!current});
                toggleDisabled(!toDateDisabled)

          }} /> Ecole actuelle </p>
        </div>
        <div className="form-group">
          <h4>jusqu'à la date</h4>
          <input type="date" name="to" value={to} onChange={e=>onChange(e)} disabled={
              toDateDisabled ? 'disabled': ''
          } />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder=" Description de programme"
            value={description} onChange={e=>onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Retour</a>
      </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
addEducation:PropTypes.func.isRequired,
}

export default connect(null,{addEducation})(AddEducation)
