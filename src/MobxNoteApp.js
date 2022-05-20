import { useObserver } from 'mobx-react'
import React, { useEffect } from 'react'
import { useNotesContext } from './mobx-store/notesContext'
import NewNoteForm from './NewNoteForm'

const MobxNoteApp = () => {

    const notesStore = useNotesContext()
    useEffect(() => {
        console.log(notesStore.notes)
    }, [notesStore.notes])
    return useObserver(()=> (
        <div>
            {JSON.stringify(notesStore.notes)}
            <NewNoteForm />
{/*             <div>
                {
                    notesStore?.notes.map(note=>(
                        <div key={note.id} >
                            {note.text}
                        </div>
                    ))
                }

            </div> */}
        </div>
    ))
}

export default MobxNoteApp
