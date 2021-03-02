import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner';
import DashboardAction from './DashbordAction'
const Dashboard = ({getCurrentProfile,auth:{user},profile : {profile,loading}}) => {
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
}
const mapStateToProps = state =>({
    auth : state.auth,
    profile : state.profile,
})

export default connect(mapStateToProps,{getCurrentProfile}) (Dashboard)
