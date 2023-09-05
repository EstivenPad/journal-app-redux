import { Link as RouterLink } from 'react-router-dom';
import { Grid, TextField, Typography, Button, Link, Alert } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';

const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
    email: [ (value) => value.includes('@'), 'The email should have an \'@\''],
    password: [ (value) => value.length >= 6, 'The password should have at least 6 characters'],
    displayName: [ (value) => value.length >= 1, 'The name is required']
}

export const RegisterPage = () => {

    const dispatch = useDispatch();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const { status, errorMessage } = useSelector(state => state.auth );
    const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);

    const { 
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid 
    } = useForm(formData, formValidations);

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        if( !isFormValid ) return;

        dispatch( startCreatingUserWithEmailPassword({email, password, displayName}) );
    }

    return (
        <AuthLayout title="Create an account">
            <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
                <Grid container>
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            name="displayName"
                            value={ displayName }
                            label="Full name"
                            type="text"
                            placeholder="Steve Carson"
                            onChange={ onInputChange }
                            fullWidth
                            error={ !!displayNameValid && formSubmitted }
                            helperText={ displayNameValid }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            name="email"
                            value={ email }
                            label="Email"
                            type="email"
                            placeholder="email@domain.com"
                            onChange={ onInputChange }
                            autoComplete="username"
                            fullWidth
                            error={ !!emailValid && formSubmitted }
                            helperText={ emailValid }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            name="password"
                            value={ password }
                            label="Password"
                            type="password"
                            placeholder="Password"
                            onChange={ onInputChange }
                            autoComplete="current-password"
                            fullWidth
                            error={ !!passwordValid && formSubmitted }
                            helperText={ passwordValid }
                        />
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                        <Grid 
                            item 
                            xs={ 12 }
                            display={ !!errorMessage ? '' : 'none' }
                        >
                            <Alert severity='error'>{ errorMessage }</Alert>
                        </Grid>
                        <Grid item xs={ 12 }>
                            <Button 
                                disabled={ isCheckingAuthentication }
                                type="submit"
                                variant="contained" 
                                fullWidth
                            >
                                Create account
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="center">
                        <Typography sx={{ mr: 1 }}>Do you already have an account?</Typography>
                        <Link component={ RouterLink } color="inherit" to="/auth/login">
                            Login
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
