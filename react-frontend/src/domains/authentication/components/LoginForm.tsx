import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import styles from './LoginForm.module.css'

const LoginForm = () => {
  interface FormData {
    email: string,
    password: string,
  }

	const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // const data = {
    //   email: e.currentTarget.elements.namedItem('email')?.value || '',
    //   password: e.currentTarget.elements.namedItem('password')?.value || '',
    // }
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', formData);
      console.log('Form successfully submitted ', response.data)
    } catch (error) {
      console.error('Error sending POST request', error);
    }
  }

	return(
		<form onSubmit={handleSubmit} className={styles.form__container}>
			<input
				type="text"
				name="email"
				placeholder="email"
				value={formData.email}
				onChange={(e) => { setFormData({...formData, email: e.target.value }) }}
				/>
			<input
				type="password"
        name="password"
				placeholder="password"
				value={formData.password}
				onChange={(e) => { setFormData({ ...formData, password: e.target.value })}}
				/>
			<button type="submit">Submit</button>
		</form>
  )
}

export default LoginForm;