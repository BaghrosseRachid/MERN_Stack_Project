import {PROFILE_ERROR,GET_PROFILE,CLEAR_PROFILE,UPDATE_PROFILE, GET_PROFILES,GET_REPOS} from '../actions/types'


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
      case UPDATE_PROFILE:
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
          case GET_PROFILES :
              return {
                  ...state,
                  profiles: payload,
                  loading:false
              }

          case GET_REPOS :
              return {
                  ...state,
                  repos:payload,
                  loading:false
              }    
  
      default:
          return state;
  }
}