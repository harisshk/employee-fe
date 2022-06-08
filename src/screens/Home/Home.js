import React, { useState } from "react";
import "./Home.css";
import EmptyContent from "../../components/Table/EmptyContent";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddNewUser from "../../components/Home/AddNewUser";
import UserListTable from "../../components/Home/UserListTable";
import { addNewUser, deleteUser } from "../../store/actions/user";


const Home = () => {

    const navigate = useNavigate();

    const users = useSelector(state => state?.users);
    const dispatch = useDispatch();

    return (
        <div className="homeContainer">
           
            <div className="homeHeader">
                <div className="homeText">
                    USER LIST
                </div>
                <Button onClick={()=>{navigate('/employee/add')}} className="homeContainerAddNewUserButton" variant="contained">
                    Add New User
                </Button>
            </div>

            
            <UserListTable
                users={[]}
                // deleteUserHandler={deleteUserHandler}
                // editUserHandler={editUserHandler}
            />

            {
                (!users || users.length === 0) &&
                <EmptyContent />
            }
        </div>
    )
}

export default Home
