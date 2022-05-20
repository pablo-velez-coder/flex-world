import { createContext, useContext } from "react";
import { createNotesStore } from ".";

const notesContext = createContext(null)

export const NotesProvider = ({children})=>{
    const notesStore = createNotesStore()
    return (
        <notesContext.Provider value={notesStore}>
            {children}
        </notesContext.Provider>
    )
}

export const useNotesContext = () => useContext(notesContext)