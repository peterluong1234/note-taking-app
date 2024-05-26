// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

function App() {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
  })
  // useEffect(() => {
  //   fetch('http://127.0.0.1:5000/').then(response =>  response.json()).then(data => console.log(data))
  // })


  const handleClick = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000')
      console.log('Successfully got a response ', response.data)
    } catch (error) {
      console.error(error);
    }
  }

  interface FormData {
    title: string,
    text: string,
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // const data = {
    //   title: e.currentTarget.elements.namedItem('title')?.value || '',
    //   text: e.currentTarget.elements.namedItem('text')?.value || '',
    // }
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', formData);
      console.log('Form successfully submitted ', response.data)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
       <p>My react app with Flask Backend</p>
       <button onClick={handleClick}>Test</button>
        <form onSubmit={handleSubmit} className='form__container'>
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
      </header>
    </div>
  );
}

export default App;