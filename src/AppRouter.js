import React from "react";
import "./styles/index.css";
import Login from "./service/Login";
import SignUp from "./service/SignUp";
import UserInfo from "./service/UserInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import UpdatInfo from "./service/UpdateInfo";
import App from "./App";
import Main from "./Main";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright ⓒ "}
            Catholic University of Korea {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

//경로 수정
class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/" element={<Main />} />
                        <Route path="/auth/userinfo" element={<UserInfo />} />
                        <Route path="/auth/updateinfo" element={<UpdatInfo />} />
                        <Route path="/todo" element={<App />} />
                    </Routes>
                </div>
                <div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </div>
            </BrowserRouter>
        );
    }
}

export default AppRouter;