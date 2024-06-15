import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";
import "../styles/AddTodo.css";

class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                title: "",
                date: this.props.selectedDate.toISOString().substring(0, 10) // 캘린더에서 선택한 날짜로 초기화
            }
        };
        this.add = props.add;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedDate !== this.props.selectedDate) {
            const thisItem = this.state.item;
             // 선택된 날짜 업데이트
            thisItem.date = this.props.selectedDate.toISOString().substring(0, 10);
            this.setState({ item: thisItem });
        }
    }

     // 입력 필드 값 변경 시 호출되는 핸들러
    onInputChange = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({ item: thisItem });
    }

    onButtonClick = () => {
        if (this.state.item.title.trim() === "") {
            alert("할 일을 입력해줘!");
            return;
        }
        this.add(this.state.item);
        this.setState({
            item: {
                title: "",
                date: this.props.selectedDate.toISOString().substring(0, 10)
            }
        });
    }

    //엔터키 핸들러 
    enterKeyEventHandler = (e) => {
        if (e.key === 'Enter') {
            this.onButtonClick();
        }
    }

    render() {
        return (
            <Paper className="whatToDo">
                <Grid container alignItems="center">
                    <Grid item xs={10}>
                        <TextField 
                            placeholder="해야할 일을 적어줘!" 
                            fullWidth 
                            onChange={this.onInputChange}
                            value={this.state.item.title}
                            onKeyPress={this.enterKeyEventHandler}
                            className="MuiTextField-root"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            color="secondary" 
                            variant="outlined"
                            onClick={this.onButtonClick}
                            className="MuiButton-root"
                        >
                            추가
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default AddTodo;
