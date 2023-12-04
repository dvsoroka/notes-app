import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { nanoid } from "nanoid"
import {
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
    setDoc
} from "firebase/firestore"
import { notesCollection, db } from "./firebase"
export default function App() {
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState("")

/**  DEBOUNCING
  - Delay the request (for example, to remote database or searsch service) 
    for a specific amount of time (e.g. 500ms)
  - If another request happens within the specified time,
    cancel the previous request and set up a new delay for the new request
*/
    /**https://scrimba.com/learn/learnreact/debouncing-updates-part-2-co1cc45f68cc600de2cd28cda
     * Challenge #d :
     * 1. Set up a new state variable called `tempNoteText`. Initialize 
     *    it as an empty string
     * 2. Change the Editor so that it uses `tempNoteText` and 
     *    `setTempNoteText` for displaying and changing the text instead
     *    of dealing directly with the `currentNote` data.
     * 3. Create a useEffect that, if there's a `currentNote`, sets
     *    the `tempNoteText` to `currentNote.body`. (This copies the
     *    current note's text into the `tempNoteText` field so whenever 
     *    the user changes the currentNote, the editor can display the 
     *    correct text.
     * 4. TBA
     */
    const [tempNoteText, setTempNoteText] = React.useState("")

    const currentNote =
        notes.find(note => note.id === currentNoteId)
        || notes[0]
    
    const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)

    React.useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
            const notesArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setNotes(notesArr)
        })
        return unsubscribe
    }, [])
    
    React.useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])

    React.useEffect(() => {
        if(currentNote) {
            setTempNoteText(currentNote.body)
        }
    }, [currentNote])

     /**
     * Create an effect that runs any time the tempNoteText changes
     * Delay the sending of the request to Firebase
     *  uses setTimeout
     * use clearTimeout to cancel the timeout
     * https://scrimba.com/learn/learnreact/debouncing-updates-part-3-co3224f249bca482bd4d12690
     */   

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (tempNoteText !== currentNote.body) {
                updateNote(tempNoteText)        
            }
        }, 500)
        return () =>  clearTimeout(timeoutId)

    }, [tempNoteText])

    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const newNoteRef = await addDoc(notesCollection, newNote)
        setCurrentNoteId(newNoteRef.id)
    }

    async function updateNote(text) {
        const docRef = doc(db, "notes", currentNoteId)
        await setDoc(
            docRef, 
            { body: text, updatedAt: Date.now() }, 
            { merge: true }
        )
    }

    async function deleteNote(noteId) {
        const docRef = doc(db, "notes", noteId)
        await deleteDoc(docRef)
    }

    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
//                          notes={notes}   // notes array is also sorted after applying .sort() method         ;)
                            notes={sortedNotes}
                            currentNote={currentNote}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                        <Editor
                            currentNote={currentNote}
                            updateNote={updateNote}
                            tempNoteText={tempNoteText}
                            setTempNoteText={setTempNoteText}
                        />
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                </button>
                    </div>

            }
        </main>
    )
}
