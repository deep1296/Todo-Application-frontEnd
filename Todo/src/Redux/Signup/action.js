export const SIGNUP_LOADING = "SIGNUP_LOADING";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

//action create
export const signuploading = ()=>({
    type:SIGNUP_LOADING
}) 

export const signupsuccess = (payload)=>({
    type:SIGNUP_SUCCESS,
    payload
})

export const signupfailure = (payload)=>({
    type:SIGNUP_FAILURE,
    payload
})

export const logout2 = () => ({
    type: "LOGOUT2"
});


export const signup =(payload)=> (dispatch) => {
    
    dispatch(signuploading())
    fetch('https://updated-todo-application-0181.herokuapp.com/register', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then((res) => {
            dispatch(signupsuccess({token:res.token}))
            // console.log(res)
        })
        .catch((err) => {dispatch(signupfailure(err))
        console.log(err)
        })
}