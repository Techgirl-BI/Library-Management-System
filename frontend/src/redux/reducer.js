import { CREATE_USER_ERROR, CREATE_USER_REQUEST, CREATE_USER_RESET, CREATE_USER_SUCCESS } from "./constant/user/userConstants";

export  const createUserReducer = (state = {user:null, success:false, loading:false,error:null},action) => {
    switch(action.type){
        case CREATE_USER_REQUEST:
            return{...state, loading:true} 
            case CREATE_USER_SUCCESS:
                return{...state, user:action.payload, loading:false, success:true} 
                case CREATE_USER_ERROR:
                    return{...state, loading:false, success:false, error:action.payload}
                    case CREATE_USER_RESET:
                        return {user:null, success:false, loading:false,error:null}
                        default: return state
    }
}
