import React from "react"

export default function Sidebar(props) {
/** https://scrimba.com/learn/learnreact/notes-app-note-summary-title-co79d4c77b58e6e0f83ac0227
 * Challenge #3: Try to figure out a way to display only the 
 * first line of note.body as the note summary in the
 * sidebar.
 * 
 * Hint 1: note.body has "invisible" newline characters
 * in the text every time there's a new line shown. E.g.
 * the text in Note 1 is:
 * "# Note summary\n\nBeginning of the note"
 * 
 * Hint 2: See if you can split the string into an array
 * using the "\n" newline character as the divider
 */
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div
                
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
{/*#3           <h4 className="text-snippet">Note {index + 1}</h4>  */}
{/*#3           <h4 className="text-snippet">{index + 1} {note.body.split("\n")[0]} </h4>      // First variant */}
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>  
                <button 
                    className="delete-btn"
                    // Your onClick event handler here

                    // // onClick={() => props.toggle(props.id)} 
                    // //  onClick={props.toggle}        // for variant using closure

                    // // onClick={() => props.deleteNote(note.id)}
// My version//     onClick={props.deleteNote}
//We're going to use firebase DB//                    onClick={(event) => props.deleteNote(event, note.id)}       // https://scrimba.com/learn/learnreact/notes-app-delete-note-cg8gPwc6
//We're going to use firebase DB// https://scrimba.com/learn/learnreact/delete-note-co47f4a75a908a771ab1fdd89
                    onClick={() => props.deleteNote(note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
