import React from "react";
import cat from './images/cat.jpg';
import './styles/Main.css'
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";


class Main extends React.Component{
        
    render() {
        return (
            <div className="full_image" >
                <img src={cat} />
                <div className="btn">
                    <div className="login_btn"> 
                        <Button > <Link to="/login" className="btn">로그인</Link> </Button>
                    </div> 
                    <div className="signup_btn">
                        <Button> <Link to="/signup" className="btn"> 계정 생성 </Link> </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;