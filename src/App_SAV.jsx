import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { data } from "./data"
import Split from "react-split"
import {nanoid} from "nanoid"
//To synchronize our notes with firebase DB:
import { 
    onSnapshot, 
    addDoc, 
    doc, 
    deleteDoc,
    setDoc 
} from "firebase/firestore" // https://scrimba.com/learn/learnreact/onsnapshot-part-1-coc5742aba9d8579a290d5cdc
import { notesCollection, db } from "./firebase"

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
           /**
           * Challenge #6 : Refactoring notes-app using Googlr Firebase DB
           *    https://scrimba.com/learn/learnreact/delete-note-co47f4a75a908a771ab1fdd89
           * 
           */
        
                /**
                 * Challenge #7:
                 *  https://scrimba.com/learn/learnreact/challenge-createdat-and-updatedat-co17c4ee9ae9ab430dd19d89c
                 * 1. Add createdAt and updatedAt properties to the notes
                 *    When a note is first created, set the `createdAt` and `updatedAt`
                 *    properties to `Date.now()`. Whenever a note is modified, set the
                 *    `updatedAt` property to `Date.now()`.
                 * 
                 * 2. Create a new `sortedNotes` array (doesn't need to be saved 
                 *    in state) that orders the items in the array from 
                 *    most-recently-updated to least-recently-updated.
                 *    This may require a quick Google search.
                 */

//                const sortedNotes = myArr.sort(function (a,b){ return new Date(a.Date.Y,a.Date.M,a.Date.D,a.H,0,0) - new Date(b.Date.Y,b.Date.M,b.Date.D,b.H,0,0)}) 
                console.log(new Date(1978,11,22) - new Date(1978,11,21))
                
       
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
 
//We're going to use firebase DB//  https://scrimba.com/learn/learnreact/delete-note-co47f4a75a908a771ab1fdd89
//We're going to use firebase DB//   function deleteNote(event, noteId) {
//We're going to use firebase DB//       event.stopPropagation()
//We're going to use firebase DB//       console.log("deleted note", noteId)
//We're going to use firebase DB//       // Your code here
//We're going to use firebase DB//// It Works!    setNotes(notes.filter(note => note.id !== noteId))
//We're going to use firebase DB//        setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))        
//We're going to use firebase DB//    }

    async function deleteNote(noteId) {
        const docRef = doc(db, "notes", noteId)
        await deleteDoc(docRef)
    }
    
//#1   const [notes, setNotes] = React.useState([])

//#2    const [notes, setNotes] = React.useState( JSON.parse(localStorage.getItem("notes")) || [])

// Lazy state initialization:
// Now we use Firebase DB! //    const [notes, setNotes] = React.useState( 
// Now we use Firebase DB! //        () => JSON.parse(localStorage.getItem("notes")) || []
// Now we use Firebase DB! //    )
// Now we use Firebase DB as follows :
    const [notes, setNotes] = React.useState([])

    const [currentNoteId, setCurrentNoteId] = React.useState(
//      (notes[0] && notes[0].id) || ""                 // refactored as follows according to https://scrimba.com/learn/learnreact/small-refactors-co26846179aa77697a78d5569
//        (notes[0]?.id) || ""          //refactored again https://scrimba.com/learn/learnreact/update-note-part-1-co03b42fba9ac46680b1240a1
        ""
    )
    
    console.log(currentNoteId)
   // alert("currentNoteId :", currentNoteId )

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


//We're going to use firebase DB//     React.useEffect(() => {
//We're going to use firebase DB//      localStorage.setItem("notes", JSON.stringify(notes))    


//#3    console.log(notes[0].body)                      //example 1
//#3    console.log(JSON.stringify(notes[0].body) )     //example 2
//#3    console.log(notes[0].body.split("\n"))          //example 3
//We're going to use firebase DB//     }, [notes])
    React.useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, function(snapshot) {
            // Sync up our local notes array with the snapshot data
            console.log("THINGS ARE CHANGING!")
            const notesArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setNotes(notesArr)
        })
     // return () => unsubscribe()   
        return unsubscribe
    }, [])

    React.useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])

// Now we use Firebase DB! //     function createNewNote() {
    async function createNewNote() {
        const newNote = {
// Now we use Firebase DB! //            id: nanoid(),
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
// Now we use Firebase DB! //        setNotes(prevNotes => [newNote, ...prevNotes])
        const newNoteRef = await addDoc(notesCollection, newNote)
        setCurrentNoteId(newNoteRef.id)
 //       console.log(notes)
 //Wrong!       const stringToSave = JSON.stringify(notes)
 //       console.log(stringToSave)
 //Wrong!       localStorage.setItem("Mynotes", stringToSave);
    }

 /* // Totally refactor this function for Firebase DB 

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

Totally refactor this function for Firebase DB https://scrimba.com/learn/learnreact/update-note-part-2-cobde4008846e662c0b7e0b0b
 */
    async function updateNote(text) {
        const docRef = doc(db, "notes", currentNoteId)
        await setDoc(docRef, { body: text, updatedAt: Date.now() }, { merge: true })
    }

    // The following function was refactored to new "currentNote" variable
    // according to https://scrimba.com/learn/learnreact/small-refactors-co26846179aa77697a78d5569
    //
    // function findCurrentNote() {
    //     return notes.find(note => {
    //         return note.id === currentNoteId
    //     }) || notes[0]
    // }
    
    console.log("unsorted: ", notes)
    const sortedNotes = notes.sort(function (a, b) { return b.updatedAt - a.updatedAt})
    console.log("sorted notes: ", sortedNotes)
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
 //                   notes={notes}
                    notes={sortedNotes}
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
{/*                {
                    currentNoteId &&             // according to https://scrimba.com/learn/learnreact/update-note-part-1-co03b42fba9ac46680b1240a1
                    notes.length > 0 &&          // we can get rid of conditional rendering  */}
                    <Editor 
 //                     currentNote={findCurrentNote()}
                        currentNote={currentNote}
                        updateNote={updateNote} 
                    />
{/*                }                            // we can get rid of conditional rendering */}
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
