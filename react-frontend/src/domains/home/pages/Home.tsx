import { useEffect, useState } from "react"
import NoteForm from "../components/NoteForm"
import axios from "axios"
import Note from "../components/Note"
import styles from './Home.module.css'
import NoteUpdateForm from "../components/NoteUpdateForm"

interface UserId {
  userId: string,
  setNoteId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface Notes {
  note_id: string,
  title: string,
  text: string,
  deleted: boolean,
}

export const Home: React.FC<UserId> = ({ userId, setNoteId }) => {
  const [notes, setNotes] = useState<Notes[]>([]);
  const [showTrash, setShowTrash] = useState(false);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/notes/1`)
      console.log("Response Data:", response)
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  useEffect(() => {
    const getNotes = async () => {
      try {
        const notesData = await fetchNotes();
        console.log("useeffect notesdata", notesData)
        setNotes(notesData)
      } catch (error) {
        console.error(error)
      }
    }

    getNotes()
  }, [])

  const renderNotes = (notes: Notes[], showTrash: boolean) => {
    // console.log('testtestest', notes)
    return notes.filter(note => Boolean(note.deleted) === showTrash).map((note) => (
      <Note
        key={note.note_id}
        title={note.title}
        text={note.text}
        user_id={userId}
        setNotes={setNotes}
        note_id={note.note_id}
        deleted={note.deleted}
      />
    ));
  };

  return (
    <div className={styles.notes__home_container}>
        {/* <NoteUpdateForm /> */}
      <div className={styles.notes__sidebar}>
        <NoteForm userId={userId} setNotes={setNotes} />
      </div>
      <div className={styles.notes__display_container}>
        <div className={styles.notes__display_header}>
          <h2 className={styles.notes__display_header_text}>{!showTrash ? 'Notes' : 'Trash'}</h2>
          <div>
            <button onClick={() => setShowTrash(!showTrash)} className={styles.notes__display_button}>
              Show {showTrash ? 'Notes' : 'Trash'}
            </button>
            { showTrash ? <button className={styles.notes__display_button}>Empty Trash</button> : ''}
          </div>
        </div>
        <div className={styles.notes__container}>
          {notes.length > 0 ? renderNotes(notes, showTrash) : <div>Loading Data</div>}
        </div>
      </div>

    </div>
  );
}