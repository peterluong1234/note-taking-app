import { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await axios.post('http://127.0.0.1:5000/signup', formData);
			console.log('Form successfully submitted', response.data)
		} catch (error) {
			console.error('Error sending POST request', error);
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input 
					type="text"
					name="email"
					placeholder="email"
					value={formData.email}
					onChange={(e) => { setFormData({ ...formData, email: e.target.value })}}
				/>
				<input 
					type="password" 
					name="password"
					placeholder='password'
					value={formData.password}
					onChange={(e) => { setFormData({ ...formData, password: e.target.value })}}
				/>
			<button type="submit">Submit</button>
			</form>
		</div>
	)
}

export default SignUpForm;