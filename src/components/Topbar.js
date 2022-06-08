import React from "react";
import {
    AppBar,
    Button,
    Toolbar
} from "@mui/material";

export const TopBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit">Home</Button>
            </Toolbar>
        </AppBar>
    )
}