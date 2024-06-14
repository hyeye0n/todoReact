
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Clock from './Clock';
import { signout } from '../service/ApiService';
import '../styles/NavigationBar.css';
import cat from '../images/cat_Noback.png';

const NavigationBar = ({ username, darkMode, toggleDarkMode }) => {
  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <nav className="navbar-todo" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/todo" className="navbar-item title">Todo List</Link>
        <div>
          <img src={cat} style={{ width: "80px", height: "80px" }} alt="cat" />
        </div>
        <div className="navbar-item">
          <Clock />
        </div>
        <div className="navbar-item">
          안녕하세요, {username || "사용자"}님!
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link to="/todo" id="button-todo" className="button"> ☑️Todo List</Link>
            <Link to="/auth/userinfo" id="button-userinfo" className="button">🔒회원정보</Link>
            <button id="button-logout" className="button" onClick={signout}>⭐Logout</button>
            <button id="button-dark-mode" className="button" onClick={toggleDarkMode}>
              {darkMode ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;