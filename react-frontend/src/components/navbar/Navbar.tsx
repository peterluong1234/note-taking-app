import { NavLink } from "../../../types/types"
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
interface NavLinks {
  links: NavLink[]
}

export const Navbar: React.FC<NavLinks> = ({ links }) => {
  return(
    <nav className={styles.navbar__header}>
      <ul className={styles.navbar__links}>
        { links.map((nav, index) => (
          <li key={index} className={styles.navbar__link}>
            <Link to={nav.link}>{nav.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}