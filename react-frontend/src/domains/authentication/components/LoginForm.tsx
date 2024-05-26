import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

const LoginForm = () => {
  interface FormData {
    title: string,
    text: string,
  }

	const [formData, setFormData] = useState({
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
      const response = await axios.post('http://127.0.0.1:5000/login', formData);
      console.log('Form successfully submitted ', response.data)
    } catch (error) {
      console.error(error);
    }
  }

	return(
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
  )
}

export default LoginForm;