import React, { useState } from 'react'
import { useNotesContext } from './mobx-store/notesContext'

const NewNoteForm = () => {
    const [text, setText] = useState('')
    const noteStore  = useNotesContext()

    const handleSubmit = e =>{
        e.preventDefault()
        noteStore.addNote(text)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input 
            value={text}
            onChange={e=> setText(e.target.value)}
            />
            <button
            type='submit'
            >Add</button>
        </form>
    )
}

export default NewNoteForm
