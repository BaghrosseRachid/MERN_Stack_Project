import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({profile:{
    bio,
    skills,
    user:{name}
}}) => {
    return (
        <div class="profile-about bg-light p-2" >
            {bio && (<Fragment>

        <h2 class="text-primary">{name.trim().split(' ')[0]}'s Biographie</h2>
        <p>
         {bio}
        </p>

            </Fragment>)}
        <div class="line"></div>
        <h2 class="text-primary">Compétences</h2>
        <div class="skills">
            {skills.map((skill,index)=>(
                <div key={index} className="p-1">
                 <i class="fal fa-check-circle"></i> {skill}
                </div>

            ))}
        </div>
      </div>
    )
}

ProfileAbout.propTypes = {
profile: PropTypes.object.isRequired,
}

export default ProfileAbout
