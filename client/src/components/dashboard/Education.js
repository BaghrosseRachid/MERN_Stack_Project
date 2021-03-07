import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import {deleteEducation} from '../../actions/profile'

const Education = ({education,deleteEducation}) => {

    const educations = education.map(edu=>(
      <tr key={edu._id}>
      <td >{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
          <Moment format="YY/MM/DD">{edu.from}</Moment>-{' '}
          {
          
          edu.to === null ? 
          ('Now'):
          
          ( <Moment format="YY/MM/DD">{edu.to}</Moment>) 
          } 
      </td>
      <td>
          <button className="btn btn-danger" onClick={()=>deleteEducation(edu._id)}>Supprimer</button>
      </td>
      </tr>
          ))



    return (
        <Fragment>
            <h2 className="my-2">Educations</h2>
           <table class="table">
               <thead>
                   <tr >
                       <th> Ecole </th>
                       <th className="hide-sm"> Diplôme</th>
                       <th className="hide-sm"> Année</th>
                       <th> Action </th>
                   </tr>
               </thead>
               <tbody>
                 {educations}
               </tbody>
           </table> 
        </Fragment>
    )
}

Education.propTypes = {
education:PropTypes.array.isRequired,
deleteEducation:PropTypes.func.isRequired,
}

export default connect(null,{deleteEducation})(Education)
