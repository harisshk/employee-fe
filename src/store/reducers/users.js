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
                data:newState,
                snackbar:{
                    isOpen:true,
                    message:"New Employee Added Successfully",
                    type:"success"
                }
            };
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
        case "SNACKBAR_OPEN": {
            const {message, type} = action.payload
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