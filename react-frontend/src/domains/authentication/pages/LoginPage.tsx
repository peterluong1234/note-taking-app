import LoginForm from "../components/LoginForm"
import styles from './LoginPage.module.css'

export const LoginPage = () => {
	return(
	<div className={styles['loginPage__container']}>
		<LoginForm />
		<div>
			No account? <a href="/signup">Sign Up Here!</a>
		</div>
	</div>)
}