import React from 'react';
import { Link } from 'react-router-dom';
import Clock from '../components/Clock';
import { signout } from '../service/ApiService';
import '../styles/NavigationBar.css'; // NavigationBar CSS 파일 임포트

const NavigationBar = ({ username }) => {
  return (
    <nav className="navbar navbar-todo" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          <Link to="/" className="title">Todo List</Link> {/* Link 컴포넌트로 수정 */}
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
            <Link to="/auth/userinfo" className="button is-info">🔒회원정보</Link>
            <button className="button is-info" onClick={signout}>⭐Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
