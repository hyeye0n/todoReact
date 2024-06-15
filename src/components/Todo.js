import React from 'react';
import { ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import '../styles/Todo.css'; // Todo.css 파일 임포트

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: props.item, readOnly: true };  // 매개변수 item 의 변수/값을 item에 대입
        this.delete = props.delete;
        this.update = props.update;
    }

    deleteEventHandler = () => {
        this.delete(this.state.item);
    }

    offReadOnlyMode = () => {
        this.setState({ readOnly: false }, () => {
            console.log("ReadOnly?", this.state.readOnly)
        });
    }

    enterKeyEventHandler = (e) => {
        if (e.key === "Enter") {
            this.setState({ readOnly: true });
            this.update(this.state.item);
        }
    }

    editEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({ item: thisItem });
    }

    checkboxEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done;
        this.setState({ item: thisItem }, () => {
            this.update(this.state.item);
        });
    }

    render() {
        const item = this.state.item;
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        const textDecoration = item.done ? 'line-through' : 'none';
        const textColor = item.done 
            ? 'lightgray' 
            : (isDarkMode ? '#ffbfbf' : '#f55555');

        return (
            <ListItem className={`todoItem ${isDarkMode ? 'dark-mode' : ''}`}>
                <Checkbox
                    checked={item.done}
                    onChange={this.checkboxEventHandler}
                    style={{ color: isDarkMode ? '#ffbfbf' : '#f55555' }}
                />
                <ListItemText>
                    <InputBase
                        inputProps={{ "aria-label": "naked", readOnly: this.state.readOnly }}
                        type="text"
                        id={item.id}
                        name={item.id}
                        value={item.title}
                        multiline={true}
                        fullWidth={true}
                        onClick={this.offReadOnlyMode}
                        onChange={this.editEventHandler}
                        onKeyPress={this.enterKeyEventHandler}
                        style={{
                            color: textColor,
                            textDecoration: textDecoration
                        }}
                    />
                </ListItemText>

                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete" onClick={this.deleteEventHandler} style={{ color: isDarkMode ? '#ffbfbf' : '#f55555' }}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default Todo;
