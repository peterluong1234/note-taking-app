// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './domains/home/pages/Home';
import { LoginPage } from './domains/authentication/pages/LoginPage';
import { SignUpPage } from './domains/authentication/pages/SignUpPage';
import { Navbar } from './components/navbar/Navbar';
import NoteUpdateForm from './domains/home/components/NoteUpdateForm';

function App() {
  // useEffect(() => {
  //   fetch('http://127.0.0.1:5000/').then(response =>  response.json()).then(data => console.log(data))
  // })
  const [user,setUser] = useState('1')
  const [noteId, setNoteId] = useState<number | undefined>(undefined);

  const handleClick = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000')
      console.log('Successfully got a response ', response.data)
    } catch (error) {
      console.error(error);
    }
  }

  const navLinks = [
    { name: 'Home', link: '/' },
    { name: 'Login', link: '/login'}
  ]

  if (user) navLinks[1].name = 'Logout'

  return (
    <div className="App">
      <Navbar links={navLinks}/>

      <Routes>
        <Route path='/' element={<Home userId={user} setNoteId={setNoteId} />}/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/notes/:noteId' element={<NoteUpdateForm />} />
      </Routes>
    </div>
  );
}

export default App;