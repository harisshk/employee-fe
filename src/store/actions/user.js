import { createEmployee, getAllEmployees } from "../../services/employeeService";

const ADD_NEW_USER = "ADD_NEW_USER";
const EDIT_USER = "EDIT_USER";
const DELETE_USER = "DELETE_USER";
const FETCH_USER = "FETCH_USER";
const IS_LOADING = "IS_LOADING";
const SNACKBAR_OPEN = "SNACKBAR_OPEN";
const RESET = "RESET";

export const addNewUser = (newData) => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING
        })
        const res = await createEmployee(newData);
        const { success, data } = res
        if (success) {
            dispatch({
                type: ADD_NEW_USER,
                payload: data
            })
        } else {
            alert("HI")
            dispatch({
                type: SNACKBAR_OPEN,
                payload: {
                    message: "Something went wrong",
                    type: 'error'
                }
            })
        }
    } catch (error) {
        console.log(error)
        alert("ERROR")

        dispatch({
            type: SNACKBAR_OPEN
        })
    }
    setTimeout(() => {
        dispatch({
            type: RESET
        })
    }, 4000);
}


export const getAllUser = () => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING
        })
        const res = await getAllEmployees();
        const { success, data } = res
        if (success) {
            dispatch({
                type: FETCH_USER,
                payload: data
            })
        } else {
            dispatch({
                type: SNACKBAR_OPEN,
                payload: {
                    message: "Something went wrong",
                    type: 'error'
                }
            })
        }

    } catch (error) {
        dispatch({
            type: SNACKBAR_OPEN,
            payload: {
                message: "Something went wrong",
                type: 'error'
            }
        })
    }
    setTimeout(() => {
        dispatch({
            type: RESET
        })
    }, 3000);
}

export const editUser = (payload) => {
    return {
        type: EDIT_USER,
        payload
    }
}


export const deleteUser = (payload) => {
    return {
        type: DELETE_USER,
        payload
    }
}
export const reset = (payload) => {
    return {
        type: RESET,
        payload
    }
}


