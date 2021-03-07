import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {logout} from '../../actions/auth'

const Navbar = ({auth:{isAuthenticated,loading},logout}) => {

  const authLinks =(
    <ul>
       <li><Link to="/profiles"><i className="far fa-users"></i>
    <span className="hide-sm"> Developpeurs</span></Link></li>

    <li><Link to="/dashboard"><i className="fal fa-user"></i>
     <span className="hide-sm"> Tableau de bord</span></Link></li>

    <li><a href="#!" onClick={logout}><i className="fad fa-sign-out"></i>
    {' '}<span className="hide-sm"> Se Déconnecter </span></a></li>
    
  </ul>
  );

  const guestLinks=(
    <ul>
      <li><Link to="/profiles"><i className="far fa-users"></i>
    <span className="hide-sm"> Developpeurs</span></Link></li>
    <li><Link to="register"><i className="fal fa-user-plus"></i> S'enregistrer</Link></li>
    <li><Link to="login"><i className="fad fa-sign-in-alt"></i> Se Connecter</Link></li>
  </ul>
  );



    return (
        <nav className="navbar bg-dark">
        <h1>
          <Link to="/"><i className="fad fa-laptop-code"></i> Espace de Developpeurs</Link>
        </h1>
        
        {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
      </nav>
    )
}
Navbar.propTypes={
  logout:PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
}

const mapStateToProps= state=>({
auth :state.auth,

})


export default connect(mapStateToProps,{logout}) (Navbar);
