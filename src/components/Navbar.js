import React from 'react';

const Navbar = () => {
  return (
    <nav>
    <div className="nav-wrapper white">
      <a href="/" className="brand-logo">Instagram</a>
      <ul id="nav-mobile" className="right">
        <li><a href="/create">Create Post</a></li>
        <li><a href="/signin">Signin</a></li>
        <li><a href="/signup">SignUp</a></li>
        <li><a href="/profile">Profile</a></li>
      </ul>
    </div>
  </nav>
  );
}

export default Navbar;