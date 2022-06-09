const initialState = {
    isLoading: false,
    error: {
        isError: false,
        message: "",
        type: ""
    },
    data: []
}

const users = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_NEW_USER": {
            let { user } = action.payload;
            let newState = state;
            newState.unshift(user);
            return [
                ...newState
            ];
        }
        case "EDIT_USER": {
            let { id, user } = action.payload;

            let newState = state.filter(user => user.id !== id);
            newState.unshift(user);
            return [
                ...newState
            ];
        }
        case "DELETE_USER": {
            let { id } = action.payload;
            let newState = state.filter(user => user.id !== id);
            return [
                ...newState
            ];
        }
        case "FETCH_USER": {

            return {
                ...state,
                data: action.payload,
                isLoading: false
            };
        }
        case "IS_LOADING": {
            return {
                ...state,
                isLoading: true
            };
        }
        case "IS_LOADED": {

            return {
                ...state,
                isLoading: false
            };
        }
        case "IS_ERROR": {
            return {
                ...state,
                isLoading: false,
                error: {
                    isError: true,
                    type: "warning",
                    message: "Something Went Wrong"
                }
            };
        }
        case "RESET": {
            return {
                ...state,
                isLoading: false,
                error: {
                    isError: false,
                    message: "",
                    type: ""
                }
            };
        }
        default:
            return state;
    }
}

export default users;