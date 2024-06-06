import React from "react";
import "./styles/index.css";
import App from "./App";
import Login from "./service/Login";
import SignUp from "./service/SignUp";
import UserInfo from "./service/UserInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright ⓒ "}
            Catholic University of Korea {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}


class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/" element={<App />} />
                        <Route path="/auth/userinfo" element={<UserInfo />} />
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