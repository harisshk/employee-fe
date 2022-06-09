const initialState = {
    isLoading: false,
    snackbar: {
        isOpen: false,
        message: "",
        type: ""
    },
    data: []
}

const users = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_NEW_USER": {
            let { data } = action.payload;
            let newState = state.data;
            newState.unshift(data);
            return {
                ...state,
                data: newState,
                snackbar: {
                    isOpen: true,
                    message: "New Employee Added Successfully",
                    type: "success"
                }
            };
        }
        case "EDIT_USER": {
            let { id, data } = action.payload;
            let newState = state?.data?.filter(user => user._id !== id);
            newState.unshift(data);
            return {
                ...state,
                data: newState,
                snackbar: {
                    isOpen: true,
                    message: "New Employee Updated Successfully",
                    type: "success"
                }
            };
        }
        case "DELETE_USER": {
            let { id } = action.payload;
            let newState = state?.data?.filter(user => user._id !== id);
            return {
                ...state,
                data: newState,
                snackbar: {
                    isOpen: true,
                    message: "New Employee Deleted Successfully",
                    type: "success"
                }
            };
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
        case "SNACKBAR_OPEN": {
            const { message, type } = action.payload
            return {
                ...state,
                isLoading: false,
                snackbar: {
                    isOpen: true,
                    type: type,
                    message: message
                }
            };
        }
        case "RESET": {
            return {
                ...state,
                isLoading: false,
                snackbar: {
                    isOpen: false,
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