import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView } from '../views';
import { NoteView } from '../views/NoteView';
import { AddOutlined } from '@mui/icons-material';
import { startNewNote } from '../../store/journal/thunks';
import { useDispatch, useSelector } from 'react-redux';

export const JournalPage = () => {
    
    const dispatch = useDispatch();
    const { isSaving, activeNote } = useSelector(state => state.journal);

    const onClickNewNote = () => {
        dispatch( startNewNote() );
    }

    return (
        <JournalLayout>
            {
                (!!activeNote)
                    ? <NoteView />
                    : <NothingSelectedView /> 
            }

            <IconButton
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
                onClick={ onClickNewNote }
                disabled={ isSaving }
            >
                <AddOutlined sx={{ fontSize: 30 }}/>
            </IconButton>
        </JournalLayout>
    )
}
