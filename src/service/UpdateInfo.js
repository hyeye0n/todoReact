import React from 'react';
import { Container, TextField, Typography, Button } from '@material-ui/core';
import { call, updateinfo } from './ApiService';
import '../styles/UpdateInfo.css'; // Custom CSS 파일 임포트

class UpdateInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            error: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // 현재 사용자 정보를 가져오는 API 호출
        call("/auth/userinfo", "GET", null)
            .then((response) => {
                if (response) {
                    this.setState({
                        username: response.username,
                        email: response.email,
                    });
                }
            })
            .catch((error) => {
                console.error("사용자 정보를 가져오는 중 오류 발생:", error);
            });
    }

//컴포넌트 업데이트 
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    // 폼 제출(submit) 시 호출되는 핸들러 함수
    handleSubmit(event) {
        event.preventDefault();
        const { username, email, password } = this.state;

        // updateinfo 함수를 호출하여 사용자 정보를 업데이트하고 결과를 처리
        updateinfo({ email, username, password })
            .then((response) => {
                window.location.href = "/auth/userinfo";
            })
            .catch((error) => {
                console.error("회원정보 수정 오류:", error); 
            });
    }

//회원정보 수정 폼 
    render() {
        const { darkMode} = this.props;
        return (
            <div className={`updateinfo ${darkMode ? 'dark-mode' : ''}`}>
                <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
                    <form noValidate onSubmit={this.handleSubmit} className="form-container">
                        <Typography component="h1" variant="h5" className="title">
                            계정 정보 수정
                        </Typography>
                        <TextField
                            autoComplete="username"
                            name="username"
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="사용자 이름"
                            autoFocus
                            value={this.state.username}
                            onChange={this.handleChange}
                            className="input-field" 
                            margin='normal'
                        />
                        <TextField
                            autoComplete="email"
                            name="email"
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="이메일 주소"
                            value={this.state.email}
                            onChange={this.handleChange}
                            className="input-field"
                            margin='normal'
                        />
                        <TextField
                            autoComplete="current-password"
                            name="password"
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            label="패스워드"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            className="input-field"
                            margin='normal'
                        />
                        {this.state.error && (
                            <Typography color="error" className="error-message">
                                {this.state.error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submit-button"
                        >
                            수정 완료
                        </Button>
                    </form>
                </Container>
            </div>
        );
    }
}

export default UpdateInfo;
