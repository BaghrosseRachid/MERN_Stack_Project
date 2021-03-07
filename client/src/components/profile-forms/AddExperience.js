import React,{Fragment,useState} from 'react'
import PropTypes from 'prop-types'
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {addExperience} from '../../actions/profile'

const AddExperience = ({addExperience,history}) => {
const [formData,setFormData] =useState({

    company:'',
    title:'',
    location:'',
    from:'',
    current:false,
    to:'',
    description:''
})

const {
    company,
    title,
    location,
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
            <h1 className="large text-primary">
       Ajouter une experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i>   Ajouter n’importe quel développeur/programmation
        positions que vous avez eues dans le passé
      </p>
      <small>* = Champs requis </small>
      <form className="form" onSubmit={e=>{
          e.preventDefault();
          addExperience(formData,history);
      }}>
        <div className="form-group">
          <input type="text" placeholder="* Titre de l’emploi" name="title" value={title} onChange={e=>onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Entreprise" name="company" value={company} onChange={e=>onChange(e)}  required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e=>onChange(e)} />
        </div>
        <div className="form-group">
          <h4>De la date </h4>
          <input type="date" name="from" value={from} onChange={e=>onChange(e)}/>
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="Actuelle" checked={current} value={current} onChange={e=>{
                setFormData({...formData,current:!current});
                toggleDisabled(!toDateDisabled)

          }} /> Emploi actuel</p>
        </div>
        <div className="form-group">
          <h4>Jusqu'à la date </h4>
          <input type="date" name="to" value={to} onChange={e=>onChange(e)} disabled={
              toDateDisabled ? 'disabled': ''
          } />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder=" Description de votre emploi "
            value={description} onChange={e=>onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Retour</a>
      </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
addExperience:PropTypes.func.isRequired,
}

export default connect(null,{addExperience})(AddExperience)
