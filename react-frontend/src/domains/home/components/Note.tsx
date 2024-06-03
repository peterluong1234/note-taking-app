import React from "react";
import styles from './Note.module.css'
import axios from "axios";

interface Notes {
    note_id: string,
    title: string,
    text: string,
    deleted: boolean,
}

interface Note {
    user_id: string,
    note_id: string,
    title: string,
    text: string,
    deleted: boolean,
    setNotes: React.Dispatch<React.SetStateAction<Notes[]>>,
}

const Note: React.FC<Note> = ({ title, text, user_id, note_id, deleted, setNotes }) => {
    const fetchNotes = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/notes/all/1`)
          const notesData = await response.data;
          return notesData
        } catch (error) {
          console.error(error)
          return []
        }
    }

    const handleDeleteClick = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/notes/toggle_deleted/${user_id}/${note_id}`)
            const data = await response.data
            console.log(data)
            const updatedNotes = await fetchNotes()
            setNotes(updatedNotes)
        } catch (error) {
            console.error(error)
        }

    }

    return(
    <div className={styles.note__card}>
        <div className={styles.note__container}>
            <div className={styles.note__btns}>
            { deleted ?
                <button onClick={handleDeleteClick} className={styles.note__restore_btn}>Restore</button>
                :
                <button onClick={handleDeleteClick} className={styles.note__delete_btn}>Delete</button>
            }
            <button className={styles.note__update_btn}>Update</button>
            </div>
            <div className={styles.note__header}>
                <h3 className={styles.note__title}>{title}</h3>     
            </div>
            <p className={styles.note__text}>{ text }</p>
        </div>
    </div>
    )
}

export default Note;