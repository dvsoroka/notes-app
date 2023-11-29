import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { data } from "./data"
import Split from "react-split"
import {nanoid} from "nanoid"

/** https://scrimba.com/learn/learnreact/notes-app-sync-notes-with-localstorage-co3c5495b8d7949e81b79988a
 * Challenge #1:
 * 1. Every time the `notes` array changes, save it 
 *    in localStorage. You'll need to use JSON.stringify()
 *    to turn the array into a string to save in localStorage.
 * 2. When the app first loads, initialize the notes state
 *    with the notes saved in localStorage. You'll need to
 *    use JSON.parse() to turn the stringified array back
 *    into a real JS array.
 */

    /**
     * Challenge #2:
     * Lazily initialize our `notes` state so it doesn't
     * reach into localStorage on every single re-render
     * of the App component
     */

export default function App() {
//#1   const [notes, setNotes] = React.useState([])

//#2    const [notes, setNotes] = React.useState( JSON.parse(localStorage.getItem("notes")) || [])
// Lazy state initialization:
    const [notes, setNotes] = React.useState( 
        () => JSON.parse(localStorage.getItem("notes")) || []
    )
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )
//  const [state, setState] = React.useState(console.log("State initialization"))

// lazy state initialization:
/*
    const [state, setState] = React.useState(
        function() {
            return console.log("State initialization")
        }
    )
*/
// But then any changes I make don't re-run that code
// or: 
    const [state, setState] = React.useState(
        () => console.log("State initialization")
    )


    React.useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
 //       console.log(notes)
 //Wrong!       const stringToSave = JSON.stringify(notes)
 //       console.log(stringToSave)
 //Wrong!       localStorage.setItem("Mynotes", stringToSave);
    }
    
    function updateNote(text) {
        setNotes(oldNotes => oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId
                ? { ...oldNote, body: text }
                : oldNote
        }))
    }
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
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
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
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
