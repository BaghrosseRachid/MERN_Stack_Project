import React,  {Fragment,useState,useEffect }from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {logout} from '../../actions/auth'



const Navbar = ({auth:{isAuthenticated,loading},logout}) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const json = localStorage.getItem("site-dark-mode");
    const currentMode = JSON.parse(json);
    if (currentMode) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    const json = JSON.stringify(darkMode);
    localStorage.setItem("site-dark-mode", json);
  }, [darkMode]);





  const authLinks =(
    <ul>
       <li><Link to="/profiles"><i className="far fa-users"></i>
    <span className="hide-sm"> Developpeurs</span></Link></li>

    <li><Link to="/dashboard"><i className="fal fa-user"></i>
     <span className="hide-sm"> Tableau de bord</span></Link></li>

    <li><a href="#!" onClick={logout}><i className="fad fa-sign-out"></i>
    {' '}<span className="hide-sm"> Se Déconnecter </span></a></li>
    <li><Link onClick={()=>{
      setDarkMode(!darkMode)}
    }><i className="fas fa-moon"></i>
    <span className="hide-sm" > Dark Mode </span></Link></li>
    
  </ul>
  );

  const guestLinks=(
    <ul>
      <li><Link to="/profiles"><i className="far fa-users"></i>
    <span className="hide-sm"> Developpeurs</span></Link></li>
    <li><Link to="register"><i className="fal fa-user-plus"></i> S'enregistrer</Link></li>
    <li><Link to="login"><i className="fad fa-sign-in-alt"></i> Se Connecter</Link></li>
    <li><Link onClick={()=>{
      setDarkMode(!darkMode)}
    }><i className="fas fa-moon"></i>
    <span className="hide-sm" > Dark Mode </span></Link></li>
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
