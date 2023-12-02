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
       /**
     * Challenge #4: When the user edits a note, reposition
     * it in the list of notes to the top of the list
     */

       /**
        * Challenge #5 : complete and implement the deleteNote function
        * https://scrimba.com/learn/learnreact/notes-app-delete-note-cg8gPwc6
        * Hints: 
        * 1. What array method can be used to return a new
        *    array that has filtered out an item based 
        *    on a condition?
        * 2. Notice the parameters being based to the function
        *    and think about how both of those parameters
        *    can be passed in during the onClick event handler
        */
       
 //      function deleteNote(event, noteId) {
 // My version//   function deleteNote(event, ) {
 // My version//          event.stopPropagation()
 // My version//          findCurrentNote()
 // My version//          // Your code here
 // My version//          //console.log( notes.filter(note => note.id !== noteId))
 // My version//          console.log(event.target.parentNode.parentNode, currentNoteId )
 // My version//          console.log( notes.filter(note => note)) 
 // My version//          console.log( notes.filter(note => note.id !== currentNoteId))
 // My version//          setNotes(notes.filter(note => note.id !== currentNoteId)) 
    function deleteNote(event, noteId) {
        event.stopPropagation()
        console.log("deleted note", noteId)
        // Your code here
// It Works!    setNotes(notes.filter(note => note.id !== noteId))
        setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
        
    }
    
//#1   const [notes, setNotes] = React.useState([])

//#2    const [notes, setNotes] = React.useState( JSON.parse(localStorage.getItem("notes")) || [])
// Lazy state initialization:
    const [notes, setNotes] = React.useState( 
        () => JSON.parse(localStorage.getItem("notes")) || []
    )
    const [currentNoteId, setCurrentNoteId] = React.useState(
//      (notes[0] && notes[0].id) || ""                 // refactored as follows according to https://scrimba.com/learn/learnreact/small-refactors-co26846179aa77697a78d5569
        (notes[0]?.id) || ""
    )

    const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]

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
//#3    console.log(notes[0].body)                      //example 1
//#3    console.log(JSON.stringify(notes[0].body) )     //example 2
//#3    console.log(notes[0].body.split("\n"))          //example 3
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
        // Put the most recently-modified note at the top
        setNotes(oldNotes => {
            const newArray = []
            for (let i = 0; i < oldNotes.length; i++) {
                const oldNote = oldNotes[i]
                if (oldNote.id === currentNoteId) {
//                  newArray.unshift({ ...oldNote, body: text }) 
                    const newElement = { ...oldNote, body: text }
                    newArray.unshift(newElement)
                }
                else {
                    newArray.push(oldNote)
                }
            }
            return newArray
            // Create a new empty array
            // Loop over the original array
                // if the id matches
                    // put the updated note at the 
                    // beginning of the new array
                // else
                    // push the old note to the end
                    // of the new array
            // return the new array
        })
        
        // This does not rearrange the notes
        // setNotes(oldNotes => oldNotes.map(oldNote => {
        //     return oldNote.id === currentNoteId
        //         ? { ...oldNote, body: text }
        //         : oldNote
        // }))

    }
    
    // The following function was refactored to new "currentNote" variable
    // according to https://scrimba.com/learn/learnreact/small-refactors-co26846179aa77697a78d5569
    //
    // function findCurrentNote() {
    //     return notes.find(note => {
    //         return note.id === currentNoteId
    //     }) || notes[0]
    // }
    
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
//                  currentNote={findCurrentNote()}             // refactored accoring to https://scrimba.com/learn/learnreact/small-refactors-co26846179aa77697a78d5569
                    currentNote={currentNote}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                    // deleteNote={() => deleteNote(event, noteId)}
                    // deleteNoteId={deleteNoteId}
// My version//                    deleteNote={() => deleteNote(event)}

        //             <Box 
        //             key={square.id}
        //             id={square.id} 
        //             on={square.on}
        //             toggle={toggle}  
          
        //           />
        // */
        // // the above <Box /> component invocation may be rewritten using closure:
        //           <Box 
        //             key={square.id}
        //             on={square.on}
        // //          toggle={toggle}
        //             toggle={() => toggle(square.id)}      // for closure variant
        
        //          />



                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
 //                     currentNote={findCurrentNote()}
                        currentNote={currentNote}
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
