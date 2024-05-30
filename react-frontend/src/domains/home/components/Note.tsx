import React from "react";
import styles from './Note.module.css'

interface Note {
    title: string,
    text: string
}

const Note: React.FC<Note> = ({ title, text }) => {
    return(
    <div className={styles.note__card}>
        <h3 className={styles.note__title}>{title}</h3> 
        <p className={styles.note__text}>{ text }</p>
    </div>
    )
}

export default Note;