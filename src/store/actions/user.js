import { getAllEmployees } from "../../services/employeeService";

const ADD_NEW_USER = "ADD_NEW_USER";
const EDIT_USER = "EDIT_USER";
const DELETE_USER = "DELETE_USER";
const FETCH_USER = "FETCH_USER";
const IS_LOADING = "IS_LOADING";
const IS_LOADED = "IS_LOADED";
const IS_ERROR = "IS_ERROR";
const RESET = "RESET";

export const addNewUser = (payload) => {
    return {
        type: ADD_NEW_USER,
        payload
    }
}


export const getAllUser = () => async (dispatch) => {
    try {
        dispatch({
            type: IS_LOADING
        })
        const res = await getAllEmployees();
        const {success, data} = res
        if(success){
            dispatch({
                type: FETCH_USER,
                payload: res.data
            })
        } else {
            dispatch({
                type: IS_ERROR
            })
        }
        
    } catch (error) {
        dispatch({
            type: IS_ERROR
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

