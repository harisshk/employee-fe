import React, { useState } from "react";
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate, useParams } from "react-router-dom";
import * as Validation from 'yup';

//MUI
import {
    Grid,
    Button,
    TextField,
    FormControl,
    MenuItem
} from "@mui/material";
import Label from "../../components/Label";


export default function EmployeeForm() {
    const navigate = useNavigate();
    const id = useParams();
    const gender = ["Male", "Female", "Other"]
    const [isEdit, setEdit] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarInfo, setSnackbarInfo] = useState({
        message: "",
        variant: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const EmployeeSchema = Validation.object().shape({
        name: Validation.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required'),
        department: Validation.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Department is required'),
        email: Validation.string().email('Email must be a valid email address').required('Email is required'),
        age: Validation.number().required('Age is required').min(10, 'Too Short').max(140, 'Too Long!'),
        gender: Validation.string().required('State is required'),
        dateOfBirth: Validation.date().max(new Date()).required("DOB is required")
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            age: '',
            pinCode: '',
            state: '',
            dateOfBirth: '',
        },
        validationSchema: EmployeeSchema,
        onSubmit: async (data) => {
            setIsLoading(true)
            // const response = isEdit ? await editCandidateData(id?.id, data) : await createCandidate(data)
            // if (response.success) {
            //     setSnackbarInfo({
            //         message: `Candidate ${isEdit ? 'updated' : 'added'} successfully`,
            //         variant: "success",
            //     });
            //     setSnackbarOpen(true);
            //     setTimeout(() => {
            //         setIsLoading(false)
            //         navigate('/candidate/list', { replace: true });
            //     }, 2000);
            // } else {
            //     setSnackbarInfo({
            //         message: `Candidate cannot be ${isEdit ? 'updated' : 'added'}`,
            //         variant: "error",
            //     });
            //     setSnackbarOpen(true);
            //     setIsLoading(false)
            // }
        }
    });
    const { errors, touched, handleSubmit, getFieldProps, setFieldValue } = formik;

    return (
        <>
            <Grid container sx={{ justifyContent: "center" }} mt="50px">
                <Grid item xs="10" spacing={3} >
                    <FormikProvider value={formik}>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
                            <Grid container spacing={2} display="flex" justifyContent="center">
                                <Grid style={{ padding: "0 10px" }} xs={12} sm={12} lg={6} xl={6} item >
                                    <Label value={'Name'} />
                                    <TextField
                                        fullWidth
                                        autoComplete="name"
                                        type="text"
                                        placeholder="Enter the name"
                                        {...getFieldProps('name')}
                                        error={Boolean(touched.name && errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                </Grid>
                                <Grid style={{ padding: "0 10px" }} xs={12} sm={12} lg={6} xl={6} item >
                                    <Label value={'Email'} />
                                    <TextField
                                        fullWidth
                                        autoComplete="email"
                                        placeholder="Enter the email"
                                        type="email"
                                        {...getFieldProps('email')}
                                        error={Boolean(touched.email && errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                </Grid>
                                <Grid style={{ padding: "0 10px" }} xs={12} sm={12} lg={6} xl={6} item >
                                    <Label value={'Date Of Birth'} />
                                    <TextField
                                        fullWidth
                                        type="date"
                                        placeholder="Select the date of Birth"
                                        {...getFieldProps('dateOfBirth')}
                                        error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                                        helperText={touched.dateOfBirth && errors.dateOfBirth}
                                    />
                                </Grid>

                                <Grid style={{ padding: "0 10px" }} xs={12} sm={12} lg={6} xl={6} item >
                                    <Label value={'Age'} />
                                    <TextField
                                        fullWidth
                                        placeholder="Enter the Age"
                                        type="number"
                                        {...getFieldProps('age')}
                                        error={Boolean(touched.age && errors.age)}
                                        helperText={touched.age && errors.age}
                                    />
                                </Grid>
                                <Grid style={{ padding: "0 10px" }} xs={12} sm={12} lg={6} xl={6} item >
                                    <Label value={'Department'} />
                                    <TextField
                                        fullWidth
                                        type="number"
                                        placeholder="Enter the Department name"
                                        {...getFieldProps('department')}
                                        error={Boolean(touched.department && errors.department)}
                                        helperText={touched.department && errors.department}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item style={{ marginTop: "40px", justifyContent: "flex-end" }} >
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    type="button"
                                    className="form-button"
                                    onClick={() => navigate("/candidate/list")}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    className="form-button"
                                >
                                    {isEdit ? "Update" : "Create"}
                                </Button>
                            </Grid>
                        </Form>
                    </FormikProvider>
                </Grid>
            </Grid>
        </>
    )
}