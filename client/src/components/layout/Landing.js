import React from 'react'
import {Link,Redirect} from 'react-router-dom';
import {Fragment} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'


const Landing = ({isAuthenticated}) => {
   
  if(isAuthenticated){
      return <Redirect to= "/dashboard"></Redirect>
  }

    return (
        <section class="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Espace de Developpeurs</h1>
            <p className="lead">
             
Créez un profil de développeur, partagez des publications et obtenez de l'aide
              autres développeurs
            </p>
            <div className="buttons">
              <Link to="register" className="btn btn-primary">S'enregistrer</Link>
              <Link to="login" className="btn btn-light">Se Connecter</Link>
            </div>
          </div>
        </div>
      </section>
    )
}
Landing.prototypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state=> ({
  isAuthenticated :state.auth.isAuthenticated
});
export default connect(mapStateToProps)( Landing)
