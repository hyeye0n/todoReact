import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Clock from '../components/Clock';
import { signout } from '../service/ApiService';
import '../styles/NavigationBar.css'; // NavigationBar CSS 파일 임포트
import cat from '../images/cat_Noback.png';

const NavigationBar = ({ username }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // 로컬 스토리지에서 다크 모드 상태를 불러옴
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    // 다크 모드 상태를 로컬 스토리지에 저장
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
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
