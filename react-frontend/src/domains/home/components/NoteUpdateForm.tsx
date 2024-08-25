import styles from './NoteForm.module.css'
import { useState } from 'react'

const NoteUpdateForm = () => {
  const [formData, setFormData] = useState({
    text: '',
    title: '',
  })

  const handleSubmit = () => {

  }



  return (
    <div className={styles.form__wrapper}>
      <form onSubmit={handleSubmit} className={styles.form__container}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }}
          className={styles.form__title}
        />
        <textarea
          name="text"
          placeholder="Text"
          value={formData.text}
          onChange={(e) => { setFormData({ ...formData, text: e.target.value }) }}
          className={styles.form__text}
        />
        <button type="submit" className={styles.form__submitbtn}>Add Note</button>
      </form>
    </div>
  )
}

export default NoteUpdateForm;