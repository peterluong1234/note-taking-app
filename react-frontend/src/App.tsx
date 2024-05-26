// import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {

// useEffect(() => {
//   fetch('http://127.0.0.1:5000/').then(response =>  response.json()).then(data => console.log(data))
// })

const handleClick = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000')
    // const data = await response
    console.log(response)
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div className="App">
      <header className="App-header">
       <p>My react app with Flask Backend</p>
       <button onClick={handleClick}>Test</button>
      </header>
    </div>
  );
}

export default App;