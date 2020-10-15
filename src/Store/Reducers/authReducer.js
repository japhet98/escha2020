const initState = {
    authError: null,
    success: false,
    loaded: false,
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN_ERROR":
            // console.log("login error");
            return {
                ...state,
                authError: "Login failed",
            };

        case "LOGIN_SUCCESS":
            // console.log("login success");
            return {
                ...state,
                authError: null,
            };

        case "SIGNOUT_SUCCESS":
            // console.log("signout success");
            return state;

        case "SIGNUP_SUCCESS":
            // console.log("signup success");
            return {
                ...state,
                authError: null,
                success: true,
                loaded: false,
            };

        case "SIGNUP_ERROR":
            // console.log("signup error");
            return {
                ...state,
                authError: action.err.message,
                success: false,
                loaded: true,
            };

        case "EC_SIGNUP_SUCCESS":
            // console.log("signup success");
            return {
                ...state,
                authError: null,
            };

        case "EC_SIGNUP_ERROR":
            //console.log("signup error");
            return {
                ...state,
                authError: action.err.message,
            };

        default:
            return state;
    }
};

export default authReducer;