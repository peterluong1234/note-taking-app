import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import styles from './NoteForm.module.css'

interface Notes {
  note_id: string,
  title: string,
  text: string,
  deleted: boolean,
}

interface NoteFormProps {
  userId: string,
  setNotes: React.Dispatch<React.SetStateAction<Notes[]>>,
}

const NoteForm: React.FC<NoteFormProps> = ({ userId, setNotes }) => {
  interface FormData {
    title: string,
    text: string,
  }

	const [formData, setFormData] = useState({
    user_id: userId,
    title: '',
    text: '',
  })

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      console.log(formData)
      const response = await axios.post('http://localhost:3001/notes', formData);
      console.log('Form successfully submitted ', response.data)
      const updatedNotes = await fetchNotes()
      setNotes(updatedNotes)
      setFormData({...formData, title: '', text: ''})
    } catch (error) {
      console.error(error);
    }
  }

	return(
    <div className={styles.form__wrapper}>
      <form onSubmit={handleSubmit} className={styles.form__container}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => { setFormData({...formData, title: e.target.value }) }}
          className={styles.form__title}
          />
        <textarea
          name="text"
          placeholder="Text"
          value={formData.text}
          onChange={(e) => { setFormData({ ...formData, text: e.target.value })}}
          className={styles.form__text}
          />
        <button type="submit" className={styles.form__submitbtn}>Add Note</button>
      </form>
    </div>
  )
}

export default NoteForm;