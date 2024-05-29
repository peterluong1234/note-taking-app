import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import styles from './NoteForm.module.css'

interface UserId {
  userId: string
}

const NoteForm: React.FC<UserId> = ({ userId }) => {
  interface FormData {
    title: string,
    text: string,
  }

	const [formData, setFormData] = useState({
    userId: userId,
    title: '',
    text: '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // const data = {
    //   title: e.currentTarget.elements.namedItem('title')?.value || '',
    //   text: e.currentTarget.elements.namedItem('text')?.value || '',
    // }
    try {
      console.log(formData)
      const response = await axios.post('http://127.0.0.1:5000/notes', formData);
      console.log('Form successfully submitted ', response.data)
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
          />
        <textarea
          name="text"
          placeholder="Text"
          value={formData.text}
          onChange={(e) => { setFormData({ ...formData, text: e.target.value })}}
          />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default NoteForm;