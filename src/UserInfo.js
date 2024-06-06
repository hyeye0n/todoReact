import React, { useState, useEffect } from 'react';
import { getUserInfo } from './service/ApiService';
import './css/UserInfo.css';
import './css/App.css';
import { signout } from './service/ApiService';
import 'bulma/css/bulma.min.css';
import {Link} from 'react-router-dom'
import Clock from './Clock';

function UserInfo() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
    // 컴포넌트가 마운트되었을 때 getUserInfo 함수를 호출하여 사용자 정보를 가져옵니다.
    getUserInfo()
        .then(response => {
        // 성공적으로 사용자 정보를 가져왔을 때 상태를 업데이트합니다.
        setUserInfo(response);
        })
        .catch(error => {
        // 에러가 발생했을 때 에러를 처리할 수 있습니다.
        console.error('Error fetching user info:', error);
        });
    }, []);

  // userInfo가 아직 없을 때 로딩 메시지를 보여줍니다.
    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <nav className="navbar navbar-todo" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <div className="navbar-item">
                <h1 className="title">Todo List</h1>
            </div>
        </div>
        <div className='clock'> <Clock/> </div>
        <div className="navbar-end">
            <div className="navbar-item">
                <div className="buttons">
                <Link to="/" className="button is-info" >⏪ 돌아가기</Link>
                <button className="button is-info" onClick={signout}> ⭐Logout </button>
                </div>
            </div>
        </div>
        </nav>

            <div className='user-info'>
                <table border="5" width="50%">
                    <thead>
                        <tr>
                            <th colSpan="2" style={{textAlign:'center'}}>고객 정보</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{textAlign:'center'}}> 
                            <td> 이메일</td>
                            <td>{userInfo.email}</td>
                        </tr>
                        <tr style={{textAlign:'center'}}>
                            <td>이름</td>
                            <td>{userInfo.username}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="update_button">  <Link to="/auth/update" className="button is-info" >📝정보수정</Link> </div>
        </div>
    );
}

export default UserInfo;
