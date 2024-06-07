import React from "react";
import { IconButton } from "@material-ui/core";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import '../styles/DeleteDoneAll.css'; // DeleteDoneAll.css 파일 임포트

class DeleteDoneAll extends React.Component {
    constructor(props) {
        super(props);
        this.delete = props.clearAllDonelist;
    }

    deleteEventHandler = () => {
        console.log("완료한 일 지우기");
        this.delete();
    }

    render() {
        const isDarkMode = document.body.classList.contains('dark-mode');

        return (
            <div className={`deleteDoneAll ${isDarkMode ? 'dark-mode' : ''}`}>
                할 일 완료!
                <IconButton
                    aria-label="할 일 완료!"
                    onClick={this.deleteEventHandler}
                >
                    <CheckCircleOutlineIcon />
                </IconButton>
            </div>
        );
    }
}

export default DeleteDoneAll;
