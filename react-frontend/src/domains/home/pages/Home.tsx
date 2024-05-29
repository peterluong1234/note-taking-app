import React from "react"
import NoteForm from "../components/NoteForm"

interface UserId {
  userId: string
}

export const Home: React.FC<UserId> = ({ userId }) => {
  return (
  <div>
    <h1>Home</h1>
    <NoteForm userId={userId}/>
  </div>)
}