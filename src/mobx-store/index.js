
export function createNotesStore(){
    return {
        notes: [],
        addNote(text){
            this.notes.push({
                text,
                id: Date.now()
            })
        },
        removeNote(id){
            return this.notes.filter(note=> note.id !== id)
        }
    }
}