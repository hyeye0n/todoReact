import React from "react";
import { IconButton } from "@material-ui/core";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

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
        return (
            <div>할 일 완료!
                <IconButton
                    aria-label="할 일 완료!"
                    onClick={this.deleteEventHandler}
                >
                    <CheckCircleOutlineIcon/>
                </IconButton>
            </div>
        );
    }
}
export default DeleteDoneAll;