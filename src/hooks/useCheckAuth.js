import { useDispatch, useSelector } from 'react-redux';
import { FirebaseAuth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { login, logout } from '../store/auth/authSlice';
import { useEffect } from 'react';
import { startLoadNotes } from '../store/journal';

export const useCheckAuth = () => {
    
    const { status } = useSelector( state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        
        onAuthStateChanged(FirebaseAuth, async(user) => {
            if( !user ) return dispatch( logout() );

            const { uid, displayName, email, photoURL } = user;
            dispatch( login({ uid, displayName, email, photoURL }) );
            dispatch( startLoadNotes() );
        })
    
    }, [])
    
    return status;
}
