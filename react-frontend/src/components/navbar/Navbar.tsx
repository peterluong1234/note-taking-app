import { NavLink } from "../../../types/types"
import { Link } from 'react-router-dom';

interface NavLinks {
  links: NavLink[]
}

export const Navbar: React.FC<NavLinks> = ({ links }) => {
  return(
    <nav>
        <ul>
          { links.map((nav, index) => (
            <li key={index}>
              <Link to={nav.link}>{nav.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
  )
}