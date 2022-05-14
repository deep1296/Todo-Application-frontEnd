import { LOGIN_FAILURE,LOGIN_SUCCESS,LOGIN_LOADING } from "./action";

const initialState = {
    loading: false,
    error: false,
    isAuthenticated: false,
    token:"",
    userId:"",
    name:""
};


export const loginReducer = (store=initialState, {type,payload}) => {
    switch (type) {
        case LOGIN_LOADING:
            return {
                ...store,
                loading: true,
                error: false,
                isAuthenticated:false
            };
        case LOGIN_SUCCESS:
            return {
                ...store,
                loading: false,
                isAuthenticated: true,
                token: payload.token,
                userId: payload.userId,
                name: payload.name,
            };
        case LOGIN_FAILURE:
            return {
                ...store,
                loading: false,
                error: true,
                isAuthenticated: false,
                token: "",
                userId: "",
                name: "",
            };
        case "LOGOUT":
            return {...initialState}
        default:
            return store;
    }
}