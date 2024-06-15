import React from "react";
import { Button, TextField, Link, Grid, Container, Typography } from "@material-ui/core";
import { signup } from "./ApiService";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");
        signup({ email: email, username: username, password: password }).then(
            (response) => {
                window.location.href = "/login";
            }
        );
    }

    render() {
        const { darkMode } = this.props;

        return (
            <Container component="main" maxWidth="xs" style={{ marginTop: "8%", backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000' }}>
                <form noValidate onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5">
                                계정 생성
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="username"
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="사용자 이름"
                                autoFocus
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
                                autoComplete="email"
                                name="email"
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="이메일 주소"
                                autoFocus
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
                                autoComplete="current-password"
                                name="password"
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="패스워드"
                                autoFocus
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
                                계정 생성
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2" style={{ color: darkMode ? '#fff' : '#000' }}>
                                이미 계정이 있습니까? 로그인하세요.
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }
}

export default SignUp;
