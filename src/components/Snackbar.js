import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function AlertSnackbar(props) {
    const { open, message, variant, handleClose } = props

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>

            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }} >
                <Alert onClose={handleClose} severity={variant || "success"} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}