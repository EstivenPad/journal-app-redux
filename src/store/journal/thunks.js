import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from './';
import { fileUpload, loadNotes } from '../../helpers';

export const startNewNote = () => {
    return async( dispatch, getState ) => {
        
        //Set isSaving in 'true' for disable any button 
        dispatch( savingNewNote() );

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        // Get the reference to the collection in Firebase 
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        //Set the new note in Firebase
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;
        
        //Add the new note in the array of store
        dispatch( addNewEmptyNote(newNote) );
        //Set the new note as active note in the store
        dispatch( setActiveNote(newNote) );
    }
}

export const startLoadNotes = () => {
    return async( dispatch, getState ) => {
        
        const { uid } = getState().auth;
        
        if( !uid ) throw new Error(`The user's uid doesn't exist`);

        const notes = await loadNotes(uid);//'loadNotes' is a helper created for load the notes from firebase
        dispatch( setNotes(notes) );
        
    }
}

export const startSavingNote = () => {
    return async(dispatch, getState) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { activeNote } = getState().journal;
        
        const noteToFirestore = { ...activeNote };
        delete noteToFirestore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${ activeNote.id }`)
        await setDoc( docRef, noteToFirestore, { merge: true } );

        dispatch( updateNote(activeNote) );
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async(dispatch) => {
        dispatch( setSaving() );

        // await fileUpload( files[0] );

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload(file) );
        }

        const photoUrls = await Promise.all( fileUploadPromises );

        dispatch(setPhotosToActiveNote( photoUrls ));
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { activeNote } = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        
        await deleteDoc(docRef);
        dispatch( deleteNoteById(activeNote.id) );
    }
}

