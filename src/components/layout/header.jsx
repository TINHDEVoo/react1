import { Link } from 'react-router-dom'
import './header.css'
const Header = () => {
    return (
        <>
            <ul>
                <li><Link class="active" href="/">Home</Link></li>
                <li><Link to="/users">Users</Link></li>
                <li><Link to="/product">Product</Link></li>
            </ul>

        </>
    )
}

export default Header