import React, { useState } from "react";
import "./styles/index.css";
import Login from "./service/Login";
import SignUp from "./service/SignUp";
import UserInfo from "./service/UserInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import UpdateInfo from "./service/UpdateInfo";
import App from "./App";
import Main from "./Main";

function Copyright({ isDarkMode }) {
    return (
        <Typography variant="body2" align="center" className={`copyright ${isDarkMode ? 'dark-mode' : ''}`}>
            {"Copyright ⓒ "}
            Catholic University of Korea {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

//경로 수정
class AppRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDarkMode: false,
        };
    }


    render() {
        const { isDarkMode } = this.state;

        return (
            <BrowserRouter>
                <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/" element={<Main />} />
                        <Route path="/auth/userinfo" element={<UserInfo />} />
                        <Route path="/auth/updateinfo" element={<UpdateInfo />} />
                        <Route path="/todo" element={<App />} />
                    </Routes>
                    <div>
                        <Box mt={5}>
                            <Copyright isDarkMode={isDarkMode} />
                        </Box>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
