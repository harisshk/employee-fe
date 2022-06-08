import React from "react";
import { Outlet } from 'react-router-dom';
import { TopBar } from "../components/Topbar";

export default function DashboardLayout() {
    return (
        <>
            <TopBar />
            <Outlet />
        </>

    )
}