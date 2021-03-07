import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { deleteAcount, getCurrentProfile } from '../../actions/profile'
import Education from './Education'
import Experience from './Experience'
import Spinner from '../layout/Spinner';
import DashboardAction from './DashbordAction'
const Dashboard = ({getCurrentProfile,deleteAcount,auth:{user},profile : {profile,loading}}) => {
    //use effect hook
    React.useEffect(() => {
         getCurrentProfile() ;
    }, []);

    return loading && profile === null ?( <Spinner/> ):( <Fragment>
      <h1 className="large text-primary">Tableau de board</h1>
      <p className="lead">
          <i className="fas fa-user"></i> Bienvenue {user && user.name}
      </p>
      {profile!==null ? (<Fragment>

      <DashboardAction/>
     <Experience experience = {profile.experience}/>
     <Education education = {profile.education}/>

     <div className="my-2">
      <button className="btn btn-danger" onClick={()=>deleteAcount()}>
        <i className="fas fa-user-minus"></i> Supprimer mon compte
      </button>

     </div>
     
      </Fragment>):
      ( <Fragment><p> Vous n’avez pas encore créer un profil, s’il vous plaît ajouter quelques infos</p>
                   <Link to= "create-profile" className="btn btn-primary my-1">
                       Créer Profile
                   </Link>
      </Fragment>) }

    </Fragment>
    );
}

Dashboard.propTypes = {
  auth:PropTypes.object.isRequired,
  getCurrentProfile:PropTypes.func.isRequired,
  profile : PropTypes.object.isRequired,
  deleteAcount:PropTypes.func.isRequired,
}
const mapStateToProps = state =>({
    auth : state.auth,
    profile : state.profile,
})

export default connect(mapStateToProps,{getCurrentProfile,deleteAcount}) (Dashboard)
