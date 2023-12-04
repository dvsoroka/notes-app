import React from "react"
import ReactMde from "react-mde"
import Showdown from "showdown"

//export default function Editor({ currentNote, updateNote }) {
export default function Editor({ tempNoteText, setTempNoteText }) {
    const [selectedTab, setSelectedTab] = React.useState("write")

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })  

    return (
        <section className="pane editor">
            <ReactMde
//              value={currentNote.body}
//                value={currentNote?.body}           // Use optional chaining as described in https://scrimba.com/learn/learnreact/update-note-part-1-co03b42fba9ac46680b1240a1
                value={tempNoteText}
//                onChange={updateNote}
                onChange={setTempNoteText}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
            />
        </section>
    )
}
