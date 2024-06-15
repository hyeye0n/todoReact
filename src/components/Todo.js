import React from 'react';
import { ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import '../styles/Todo.css'; // Todo.css 파일 임포트

class Todo extends React.Component {
    constructor(props) {
          // props로 전달받은 item을 초기 상태로 설정
        super(props);
        this.state = { item: props.item, readOnly: true };  // 매개변수 item 의 변수/값을 item에 대입
        this.delete = props.delete;
        this.update = props.update;
    }

    // 리스트 삭제 이벤트 핸들러
    deleteEventHandler = () => {
        this.delete(this.state.item);
    }

     // 리스트를 수정 할 수 있게 해주는 핸들러 
    offReadOnlyMode = () => {
        this.setState({ readOnly: false }, () => {
            console.log("ReadOnly?", this.state.readOnly)
        });
    }

     // 엔터 키 이벤트 핸들러
    enterKeyEventHandler = (e) => {
        if (e.key === "Enter") {
            this.setState({ readOnly: true });
            this.update(this.state.item);
        }
    }

    // 리스트 수정 이벤트 핸들러
    editEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({ item: thisItem });
    }

    // 체크박스 클릭 이벤트 핸들러
    checkboxEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done;
        this.setState({ item: thisItem }, () => {
            this.update(this.state.item);
        });
    }

//다크모드에 따라 아이콘과 텍스트 색상 변경 
    render() {
        const item = this.state.item;
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        const textDecoration = item.done ? 'line-through' : 'none';
        const textColor = item.done 
            ? 'lightgray' 
            : (isDarkMode ? 'black' : 'black');

        return (
            <ListItem className={`todoItem ${isDarkMode ? 'dark-mode' : ''}`}>
                <Checkbox
                    checked={item.done}
                    onChange={this.checkboxEventHandler}
                    style={{ color: isDarkMode ? '#ffbfbf' : '#757575' }}
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
                    <IconButton aria-label="Delete" onClick={this.deleteEventHandler} style={{ color: isDarkMode ? '#ffbfbf' : '#757575' }}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default Todo;
