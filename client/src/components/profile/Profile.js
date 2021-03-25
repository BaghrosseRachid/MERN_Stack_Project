import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link } from 'react-router-dom'
import {connect} from 'react-redux'
import Spinner from '../../components/layout/Spinner'
import ProfileAbout from './ProfileAbout'
import ProfileTop from './ProfileTop'
import ProfileExperiences from './ProfileExperiences'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'

import {getProfileById} from '../../actions/profile'
import { profile_url } from 'gravatar'


const Profile = ({getProfileById,profile:{profile,loading},auth,match}) => {

useEffect(() => {

    getProfileById(match.params.id) //will toggle a get profile action
   
   

}, [getProfileById,match.params.id])

    return (

        <Fragment>
          {profile === null || loading ? (<Spinner></Spinner>) :
           (<Fragment>

              <Link to="/profiles" className="btn btn-dark my-2" >Retour </Link>
              { auth.isAuthenticated && !auth.loading && auth.user._id === profile.user._id  && (<Link to="/edit-profile" 
              className="btn btn-primary my-2"> Modifier Profile</Link>)}
                <div className="profile-grid my-1">
                  <ProfileTop profile={profile}></ProfileTop>
                  <ProfileAbout profile={profile}></ProfileAbout>
                    
                    <div className="profile-exp bg-dark p-2">
                      <h2 className="text-primary">
                        Experiences 
                      </h2>
                      {profile.experience.length > 0 ? (<Fragment>

                        { profile.experience.map(experience=>(
                          <ProfileExperiences key={experience._id} experience={experience}/>
                        ))}
                      </Fragment>) : (<h4> Pas d'experiences</h4>) }

                    </div>
                    <div className="profile-edu bg-dark p-2">
                      <h2 className="text-primary">
                        Educations  
                      </h2>
                      {profile.education.length > 0 ? (<Fragment>

                        { profile.education.map(education=>(
                          <ProfileEducation key={education._id} education={education}/>
                        ))}
                      </Fragment>) : (<h4> Pas d'educations</h4>) }

                    </div>
                     {profile.githubusername && (
                       <ProfileGithub username={profile.githubusername}></ProfileGithub>
                     )}
                 </div>
              </Fragment>
             ) }  
           
        </Fragment>
    )
}

Profile.propTypes = {
getProfileById:PropTypes.func.isRequired,
auth:PropTypes.object.isRequired,
profile:PropTypes.object.isRequired,
}
const mapStateToProps=state=>({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps,{getProfileById})(Profile)
