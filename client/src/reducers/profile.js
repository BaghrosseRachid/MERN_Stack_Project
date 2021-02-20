import {PROFILE_ERROR,GET_PROFILE,CLEAR_PROFILE} from '../actions/types'


const initialeState= {
    profile :null,
    profiles : [],
    loading : true,
    repos:[],
    error: {}

}   
export default function (state=initialeState,action ) {
  const {type,payload}=action;
  switch (type) {
      //get profile
      case GET_PROFILE:
          return {
              ...state,
              profile:payload,
              loading :false
              
          }
          case PROFILE_ERROR:
            return {
                ...state,
                error : payload,
                loading :false  
            }
            case CLEAR_PROFILE:
          return {
              ...state,
              profile:null,
              loading :false,
              repos:[]
              
          }
  
      default:
          return state;
  }
}