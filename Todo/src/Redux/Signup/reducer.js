import { SIGNUP_LOADING,SIGNUP_SUCCESS, SIGNUP_FAILURE  } from "./action";


const initialState = {
    loading :false,
    error:false,
    isauthenticated:false
}


export const signupreducer = (store=initialState,{type,payload})=>{
    switch (type) {
        case SIGNUP_LOADING:
            return {...store,loading:true,error:false,isauthenticated:false}
        case SIGNUP_SUCCESS:
            return {...store,loading:false,error:false,isauthenticated:true}
        case SIGNUP_FAILURE:
            return {...store,loading:false, error:true,isauthenticated:false}
        case "LOGOUT2":
                return {...initialState}
        default:
            return store
    }
}