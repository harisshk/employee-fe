import React, { useState, useEffect } from "react";
import "./Home.css";
import EmptyContent from "../../components/Table/EmptyContent";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserListTable from "../../components/Home/UserListTable";
import { getAllUser } from "../../store/actions/user";
import { deleteEmployee, getAllEmployees } from "../../services/employeeService";
import DeleteDialog from '../../components/Dialog/DeleteDialog'
import Loader from "../../components/Loader";
import { AlertSnackbar } from "../../components/Snackbar";

const Home = () => {

    const navigate = useNavigate();

    const users = useSelector(state => state?.users);
    console.log(users)
    const dispatch = useDispatch();
    const [employeesData, setEmployeesData] = useState([])

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarInfo, setSnackbarInfo] = useState({
        message: "",
        variant: "",
    });
    const [deleteAction, setDeleteAction] = useState({
        isDeleteModalOpen: false,
        id: ''
    })
    const editUserHandler = (id) => {
        navigate(`/employee/edit/${id}`);
    }
    const fetchData = async () => {
        dispatch(getAllUser())
    }
    const deleteHandler = async (id) => {
        const response = await deleteEmployee(id)
        const { success } = response
        if (success) {
            fetchData()
            setSnackbarOpen(true)
            setSnackbarInfo({
                message: `Data deleted successfully`,
                variant: "success",
            })
        }
        else {
            setSnackbarOpen(true)
            setSnackbarInfo({
                message: `Data cannot be deleted`,
                variant: "error",
            })
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="homeContainer">

            <div className="homeHeader">
                <div className="homeText">
                    USER LIST
                </div>
                <Button onClick={() => { navigate('/employee/add') }} className="homeContainerAddNewUserButton" variant="contained">
                    Add New User
                </Button>
            </div>
            {
                (!users?.data || users?.data?.length === 0) ?
                    <EmptyContent />
                    :
                    <UserListTable
                        users={users?.data}
                        deleteHandler={(id) => setDeleteAction({
                            isDeleteModalOpen: true,
                            id
                        })}
                        editHandler={editUserHandler}
                    />
            }
            <DeleteDialog open={deleteAction?.isDeleteModalOpen} onDelete={() => {
                deleteHandler(deleteAction?.id)
                setDeleteAction({
                    isDeleteModalOpen: false,
                    id: ''
                })
            }} onClose={() => setDeleteAction({
                isDeleteModalOpen: false,
                id: ''
            })} />
            <Loader open={users.isLoading} />
            <AlertSnackbar
                open={users?.error?.isError}
                message={users?.error?.message}
                variant={users?.error?.type}
                handleClose={() => setSnackbarOpen(false)}
            />
        </div>
    )
}

export default Home
