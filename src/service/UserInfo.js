import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../service/ApiService'; // ApiService 파일 경로 수정
import '../styles/UserInfo.css';
import 'bulma/css/bulma.min.css';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar'; // NavigationBar 컴포넌트 경로 수정

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
        <div className='UserInfo'>
            <NavigationBar username={userInfo.username} /> {/* NavigationBar 컴포넌트 사용 */}
            <div className='user-info'>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">고객 정보</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>이메일</td>
                            <td>{userInfo.email}</td>
                        </tr>
                        <tr>
                            <td>이름</td>
                            <td>{userInfo.username}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="update_button">
                <Link to="/auth/updateinfo" className="button is-info">📝정보수정</Link>
            </div>
        </div>
    );
}

export default UserInfo;
