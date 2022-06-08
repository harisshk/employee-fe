import React, { useState, useEffect } from "react";
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

//Components
import Label from "../../components/Label";
import { AlertSnackbar } from '../../components/Snackbar'
import Loader from '../../components/Loader';

//Constants
import { gender } from "../../constants";
import { createEmployee, editEmployeeData, getEmployeeById } from "../../services/employeeService";

export default function EmployeeForm() {
    const navigate = useNavigate();
    const id = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarInfo, setSnackbarInfo] = useState({
        message: "",
        variant: ""
    })

    const EmployeeSchema = Validation.object().shape({
        name: Validation.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required'),
        department: Validation.string().min(2, 'Too Short!').max(10, 'Too Long!').required('Department is required'),
        email: Validation.string().email('Email must be a valid email address').required('Email is required'),
        age: Validation.number().required('Age is required').min(10, 'Too Short').max(140, 'Too Long!'),
        gender: Validation.string().required('Gender is required'),
        dateOfBirth: Validation.date().max(new Date()).required("DOB is required")
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            age: '',
            department: '',
            gender: '',
            dateOfBirth: '',
        },
        validationSchema: EmployeeSchema,
        onSubmit: async (data) => {
            setIsLoading(true)
            const response = isEdit ? await editEmployeeData(id?.id, data) : await createEmployee(data)
            if (response.success) {
                setSnackbarInfo({
                    message: `Candidate ${isEdit ? 'updated' : 'added'} successfully`,
                    variant: "success",
                });
                setSnackbarOpen(true);
                setTimeout(() => {
                    setIsLoading(false)
                    navigate('/home', { replace: true });
                }, 2000);
            } else {
                setSnackbarInfo({
                    message: `Candidate cannot be ${isEdit ? 'updated' : 'added'}`,
                    variant: "error",
                });
                setSnackbarOpen(true);
                setIsLoading(false)
            }
        }
    });
    const { errors, touched, handleSubmit, getFieldProps, setFieldValue } = formik;
    const getEmployeeData = async () => {
        const response = await getEmployeeById(id?.id)
        setIsLoading(true)
        if (response?.success) {
            const { name, age, dateOfBirth, email, department, gender } = response.data
            setFieldValue('name', name)
            setFieldValue('age', age)
            setFieldValue('dateOfBirth', dateOfBirth)
            setFieldValue('email', email)
            setFieldValue('department', department)
            setFieldValue('gender', gender)
        } else {
            setSnackbarOpen(true)
            setSnackbarInfo({
                message: `Bike data cannot be fetched`,
                variant: "error",
            });
        }
        setIsLoading(false)
    }
    useEffect(() => {
        if (id?.id) {
            setIsEdit(true)
            getEmployeeData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id?.id])

    return (
        <>
            <Grid container sx={{ justifyContent: "center" }} mt="50px" spacing={3}>
                <Grid item xs="10"  >
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
                                    <Label value={'Gender'} />
                                    <FormControl fullWidth>
                                        <TextField
                                            select
                                            placeholder="Select the Gender"
                                            label="Gender"
                                            {...getFieldProps('gender')}
                                            error={Boolean(touched.gender && errors.gender)}
                                            helperText={touched.gender && errors.gender}
                                        >
                                            {gender && gender.map((value) => {
                                                return (
                                                    <MenuItem key={value} value={value}>{value}</MenuItem>
                                                )
                                            })}
                                        </TextField>
                                    </FormControl>
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
                                        type="text"
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
                                    onClick={() => navigate("/home")}
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
            <AlertSnackbar
                open={snackbarOpen}
                message={snackbarInfo.message}
                variant={snackbarInfo.variant}
                handleClose={() => setSnackbarOpen(false)}
            />
            <Loader open={isLoading} />
        </>
    )
}