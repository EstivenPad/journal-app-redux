import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/provider';
import { clearNotesLogout } from '../journal';
import { checkingCredentials, logout, login } from './authSlice';

export const checkingAuthentication = ( ) => {
    return async (dispatch) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        
        if( !result.ok ) dispatch( logout( result.errorMessage ) );

        dispatch( login( result ) );
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async(dispatch) => {
        dispatch( checkingCredentials() );
        
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

        if ( !ok ) return dispatch( logout({ errorMessage }) );

        dispatch( login({ uid, photoURL, displayName, email }) );

    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async(dispatch) => {
        dispatch( checkingCredentials() );

        const { ok, displayName, photoURL, uid, errorMessage } = await loginWithEmailPassword({ email, password });

        if( !ok ) return dispatch( logout({ errorMessage }));

        dispatch( login({ uid, photoURL, displayName, email }))

    }
}

export const startLogout = () => {
    return async(dispatch) => {

        await logoutFirebase();

        dispatch(clearNotesLogout());
        dispatch( logout() );

    }
}