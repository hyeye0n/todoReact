import React from "react";
import { signin } from "./ApiService";
import { Button, TextField, Grid, Link, Container, Typography } from "@material-ui/core";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get("email");
        const password = data.get("password");

        // ApiService의 signin 메소드를 사용해 로그인
        signin({ email: email, password: password });
    }

    render() {
        const { darkMode } = this.props;
        
        return (
            <Container maxWidth="xs" style={{ marginTop: "5%", backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000' }}>
                <Grid container spacing={2} alignItems="center">
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                </Grid>
                <form noValidate onSubmit={this.handleSubmit}>
                    {" "}
                    { /* submit 버튼을 클릭하면 handleSubmit이 실행됨 */ }
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="이메일 주소"
                                name="email"
                                autoComplete="email"
                                InputLabelProps={{
                                    style: { color: darkMode ? '#fff' : '#000' }
                                }}
                                InputProps={{
                                    style: { color: darkMode ? '#fff' : '#000' }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                type="password"
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="패스워드"
                                name="password"
                                autoComplete="current-password"
                                InputLabelProps={{
                                    style: { color: darkMode ? '#fff' : '#000' }
                                }}
                                InputProps={{
                                    style: { color: darkMode ? '#fff' : '#000' }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                로그인
                            </Button>
                        </Grid>
                        <Link href="/signup" variant="body2" style={{ color: darkMode ? '#fff' : '#000' }}>
                            <Grid item>계정이 없습니까? 여기서 가입하세요.</Grid>
                        </Link>
                    </Grid>
                </form>
            </Container>
        );
    }
}

export default Login;
