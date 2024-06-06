import React from "react";
import { IconButton } from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

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
                    <DeleteOutlined />
                </IconButton>
            </div>
        );
    }
}
export default DeleteDoneAll;