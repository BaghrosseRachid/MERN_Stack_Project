import React, {Fragment, useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createProfile,getCurrentProfile} from '../../actions/profile'
import {Link,withRouter} from 'react-router-dom'
import profile from '../../reducers/profile'




const EditProfile = ({profile:{profile,loading},createProfile,getCurrentProfile,history}) => {

    const [formData,setFormData ]= useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''

    });
    const [displaySocialInputs, toggleSocialInputs] =useState(false);
      //use effect 
     useEffect(() => {
         getCurrentProfile();
        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            instagram: loading || !profile.social ? '' : profile.social.instagram,
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin
        })
     }, [loading])



    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram

    } = formData;

    const onchange=e=> setFormData({...formData,[e.target.name]:e.target.value});
// submit data form to the backend
       const onSubmit = e => {
        e.preventDefault();   
        createProfile(formData, history,true);
    }


    return (
        <Fragment>
            <h1 className="large text-primary">
        Créer Votre Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Obtenons quelques informations pour que votre profil se démarque
      </p>
      <small>* = champ requis</small>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e=>onchange(e)}>
            <option value="0">* Sélectionnez votre Statut professionnel</option>
            <option value="Developer">Developpeur</option>
            <option value="Junior Developer">Développeur Junior</option>
            <option value="Senior Developer"> Developpeur Senior</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Étudiant ou apprenant</option>
            <option value="Instructor">Instructeur ou enseignant</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Donnez-nous une idée de l’endroit où vous en êtes dans votre carrière</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Entreprise" name="company" value={company} onChange={e=>onchange(e)}  />
          <small className="form-text"
            >Peut-être votre propre entreprise ou celle pour qui vous travaillez</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Site Web" name="website" value={website} onChange={e=>onchange(e)} />
          <small className="form-text"
            >Peut-être votre propre site Web ou un site Web de l’entreprise</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e=>onchange(e)}/>
          <small className="form-text"> City & state suggested </small >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Compétences" name="skills"  value={skills} onChange={e=>onchange(e)}/>
          <small className="form-text"
            >S’il vous plaît utiliser des valeurs séparées virgule (par exemple. HTML,CSS,JavaScript,PHP)</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nom d’utilisateur Github" 
            name="githubusername"
            value={githubusername} onChange={e=>onchange(e)}
          />
          <small className="form-text"
            >Si vous souhaitez votre dernier repos et un lien Github, incluez votre nom d’utilisateur</small >
        </div>
        <div className="form-group">
          <textarea placeholder="Une courte biographie de vous-même" name="bio" value={bio} onChange={e=>onchange(e)}></textarea>
          <small className="form-text">Parlez-nous un peu de vous</small>
        </div>

        <div className="my-2">
          <button type="button" onClick={()=>toggleSocialInputs(!displaySocialInputs)} className="btn btn-light">
          Ajouter des liens réseau social
          </button>
          <span>Optionnel</span>
        </div>
         {displaySocialInputs &&
          ( <Fragment>
            <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e=>onchange(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e=>onchange(e)} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e=>onchange(e)} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e=>onchange(e)}  />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" name="instagram"  value={instagram} onChange={e=>onchange(e)}/>
        </div> 
             
              </Fragment>
              
           )}
      
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Retour</Link>
      </form>
        </Fragment>
    )
}
EditProfile.propTypes = {
createProfile :PropTypes.func.isRequired,
profile : PropTypes.object.isRequired,
getCurrentProfile:PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps,{createProfile,getCurrentProfile})(withRouter(EditProfile));
