import React, { useState } from "react";
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
    const [isEditing, setIsEditing] = useState({ title: false, text: false});
    const [formData, setFormData] = useState({
        title: title,
        text: text,
      })

    const hasChanges = (): boolean => {
        return formData.title !== title || formData.text !== text;
    };

    const fetchNotes = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/notes/1`)
          const notesData = await response.data;
          return notesData
        } catch (error) {
          console.error(error)
          return []
        }
    }

    const updateNote = async () => {
        if(hasChanges()) {
            try {
                await axios.put(`http://localhost:3001/notes/${note_id}`, formData);
                const updatedNotes = await fetchNotes()
                setNotes(updatedNotes)
            } catch (error) {
                console.error(error);
            }
        }
      }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: 'title' | 'text') => {
        setFormData({ ...formData, [field]: e.target.value})
    }

    const handleEdit = async (field: 'title' | 'text') => {
        if(hasChanges()) {
            await updateNote();
        }
        setIsEditing({ ...isEditing, [field]: false })
    }

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>, field: 'title' | 'text') => {
        if (e.key === "Enter") {
            e.preventDefault();
            if(hasChanges()) {
                await updateNote();
            }
            setIsEditing({ ...isEditing, [field]: false })
        }
    }
    const handleElementClick = (field: 'title' | 'text') => {
        setIsEditing({ ...isEditing, [field]: true})
    }

    const handleDeleteClick = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/notes/toggle_deleted/${note_id}`)
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
            <div className={styles.note__header}>
                {
                    isEditing.title ?
                    <textarea
                    // type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => handleTextChange(e, "title")}
                    className={styles.note__title}
                    onBlur={() => handleEdit("title")}
                    onKeyDown={(e) => handleKeyDown(e, "title")}
                    />
                    :
                    <h3 className={styles.note__title} onClick={() => handleElementClick("title")}>{title}</h3>
                }
            </div>
            {
                isEditing.text ?
                <textarea
                name="text"
                placeholder="Text"
                value={formData.text}
                onChange={(e) => handleTextChange(e, "text")}
                className={styles.note__text}
                onBlur={() => handleEdit("text")}
                onKeyDown={(e) => handleKeyDown(e, "text")}
                />
                :
                <p className={styles.note__text} onClick={() => handleElementClick("text")}>{ text }</p>
            }
            <div className={styles.note__btns}>
                { deleted ?
                    <button onClick={handleDeleteClick} className={styles.note__restore_btn}>Restore</button>
                    :
                    <button onClick={handleDeleteClick} className={styles.note__delete_btn}>Delete</button>
                }
                {/* <a href={`/notes/${note_id}`} className={styles.note__update_btn}>Update</a> */}
                {/* <button className={styles.note__update_btn}>Update</button> */}
            </div>
        </div>
    </div>
    )
}

export default Note;