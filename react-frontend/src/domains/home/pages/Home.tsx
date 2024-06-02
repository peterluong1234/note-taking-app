import { useEffect, useState } from "react"
import NoteForm from "../components/NoteForm"
import axios from "axios"
import Note from "../components/Note"
import styles from './Home.module.css'

interface UserId {
  userId: string
}

interface Notes {
  note_id: string,
  title: string,
  text: string
}

export const Home: React.FC<UserId> = ({ userId }) => {
  const [notes, setNotes] = useState<Notes[]>([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/notes/all/1`)
      console.log("Response Data:", response.data)
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
        console.log(notesData)
        setNotes(notesData)
      } catch (error) {
        console.error(error)
      }
    }

    getNotes()
  }, [])

  return (
    <div>
      <h1>Home</h1>
      <NoteForm userId={userId} setNotes={setNotes}/>
      <h2>View Your Notes</h2>
      <div className={styles.notes__container}>
        {notes ? notes.map((note) => (
          <Note key={note.note_id} title={note.title} text={note.text} user_id={userId} setNotes={setNotes} note_id={note.note_id}/>
        )): <div>Loading Data</div>}
      </div>
    </div>
  )
}