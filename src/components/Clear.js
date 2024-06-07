import React from "react";
import { IconButton } from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import '../styles/Clear.css'; // Clear.css 파일 임포트

class Clear extends React.Component {
    constructor(props) {
        super(props);
        this.delete = props.clearAll;
    }

    deleteEventHandler = () => {
        console.log("전체 삭제");
        this.delete();
    }

    render() {
        const isDarkMode = document.body.classList.contains('dark-mode');

        return (
            <div className={`clear ${isDarkMode ? 'dark-mode' : ''}`}>
                전체 삭제
                <IconButton
                    aria-label="전체삭제"
                    onClick={this.deleteEventHandler}
                >
                    <DeleteOutlined />
                </IconButton>
            </div>
        );
    }
}

export default Clear;
