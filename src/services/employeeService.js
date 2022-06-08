import axios from "axios";
import { employeeServiceUrl } from '../constants/url'


export const getAllEmployees = async () => {
    try {
        const response = await axios.get(`${employeeServiceUrl}`)
        if (response.data.success) {
            return {
                ...response?.data
            }
        }
    } catch (error) {
        console.log("err", error)
        return { success: false, message: error?.response?.data?.message };
    }
};
export const getEmployeeById = async (employeeId) => {
    try {
        const response = await axios.get(`${employeeServiceUrl}/${employeeId}`)
        if (response.data.success) {
            return {
                ...response?.data
            }
        }
    } catch (error) {
        console.log("err", error)
        return { success: false, message: error?.response?.data?.message };
    }
};

export const editEmployeeData = async (employeeId, payload) => {
    try {
        const response = await axios.put(`${employeeServiceUrl}/edit/${employeeId}`, payload)
        if (response.data.success) {
            return {
                ...response?.data
            }
        }
    } catch (error) {
        console.log("err", error)
        return { success: false, message: error?.response?.data?.message };
    }
};

export const createEmployee = async (payload) => {
    try {
        const response = await axios.post(`${employeeServiceUrl}/create`, payload)
        if (response.data.success) {
            return {
                ...response?.data
            }
        }
    } catch (error) {
        console.log("err", error)
        return { success: false, message: error?.response?.data?.message };
    }
};
export const deleteEmployee = async (id) => {
    try {
        const response = await axios.delete(`${employeeServiceUrl}/${id}`)
        if (response.data.success) {
            return {
                ...response?.data
            }
        }
    } catch (error) {
        console.log("err", error)
        return { success: false, message: error?.response?.data?.message };
    }
};