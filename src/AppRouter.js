import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Main from './Main';
import Login from './service/Login';
import SignUp from './service/SignUp';
import UserInfo from './service/UserInfo';
import UpdateInfo from './service/UpdateInfo';
import App from './App';
import NavigationBar from './components/NavigationBar'; // NavigationBar 컴포넌트 import
import { call } from './service/ApiService';
import './styles/index.css';

function Copyright({ isDarkMode }) {
  return (
    <Typography variant="body2" align="center" className={`copyright ${isDarkMode ? 'dark-mode' : ''}`}>
      {"Copyright ⓒ"}
      Catholic University of Korea {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const InnerAppRouter = ({ isDarkMode, toggleDarkMode, username }) => {
  const location = useLocation();

  // 네비게이션 바를 보여줄 경로 설정
  const showNavigationBar = location.pathname === '/todo' || location.pathname === '/auth/userinfo' || location.pathname === '/auth/updateinfo';

  //회원정보, 메인 페이지 경로 업데이트 
  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {showNavigationBar && <NavigationBar username={username} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Main />} />
        <Route path="/auth/userinfo" element={<UserInfo darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/auth/updateinfo" element={<UpdateInfo darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/todo" element={<App darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
      </Routes>
      <div>
        <Box mt={5}>
          <Copyright isDarkMode={isDarkMode} />
        </Box>
      </div>
    </div>
  );
}

const AppRouter = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem('darkMode')) || false
  );
  const [username, setUsername] = useState(null);

  useEffect(() => {
    document.title = 'Todo List'; //title 수정 
    // 다크 모드 상태에 따라 body에 dark-mode 클래스 추가 또는 제거
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    // 로컬 스토리지에 다크 모드 설정 저장
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));

    // 사용자 정보 가져오기
    call('/auth/userinfo', 'GET', null).then((response) => {
      setUsername(response.username);
    });
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <BrowserRouter>
      <InnerAppRouter
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        username={username}
      />
    </BrowserRouter>
  );
}

export default AppRouter;
