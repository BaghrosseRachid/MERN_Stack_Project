import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const ProfileItem = ({profile:{
user:{_id,name,avatar},
company,
status,
location,
skills

}}) => {


    return (
        <div className="profile bg-dark">
        <img src={avatar} alt="" className="roung-img"/>
        <div>
            <h2>{name}</h2>
            <p>{status} {company && <span> à {company}</span>}</p>
            <p className="my-1">{location && <span>{location}</span>}</p>
            <Link to={`/profile/${_id}`} className="btn btn-primary">Consulter ce profil </Link>
        </div>
        <ul>
            {skills.slice(0,4).map((skill,index)=>(
                <li key={index} className="text-light">
                    <i className="fal fa-check-circle">{'   '}{skill}</i>
                </li>
            ))}
        </ul>
        </div>
    )
}

ProfileItem.propTypes = {
profile:PropTypes.object.isRequired,
}

export default ProfileItem
