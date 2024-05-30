import { useEffect, useState } from "react"
import NoteForm from "../components/NoteForm"
import axios from "axios"
import Note from "../components/Note"
import styles from './Home.module.css'

interface UserId {
  userId: string
}

interface Notes {
  NoteID: string,
  Title: string,
  Text: string
}

export const Home: React.FC<UserId> = ({ userId }) => {
  const [notes, setNotes] = useState<Notes[]>([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/notes/all/1`)
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
          <Note key={note.NoteID} title={note.Title} text={note.Text} />
        )): <div>Loading Data</div>}
      </div>
    </div>
  )
}