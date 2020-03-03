import React from 'react'
import { Link } from 'react-router-dom';
export const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
      <h1>
        <Link to='/'><i className=""></i> Would You React</Link>
      </h1>
      <ul>
        <li><Link to='/' ></Link>profiles</li>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/login'>Login</Link></li>
      </ul>
    </nav>
    )
}

export default Navbar
