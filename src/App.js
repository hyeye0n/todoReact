import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo'
import {Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography} from "@material-ui/core";
import './App.css';
import { call, signout } from './service/ApiService';
import DeleteDoneAll from './DeleteDoneAll';
import Clear from './Clear';
import Clock from './Clock';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items : [],
      // 로딩 중이라는 상태를 표현할 변수 생성자에 상태 변수를 초기화한다.
      loading:true,
    };
  }

// add 함수 추가 - 매개변수로 item이 넘어오면 넘겨줌 
add = (item) => {
  call("/todo","POST",item).then((response) =>
    this.setState({items:response.data})
  ); // 백엔드로 보내고 받은 response를 setState에 저장 
}

  delete = (item) => {
    call("/todo","DELETE",item).then((response) =>
      this.setState({items:response.data})
    );
  }

  
  clearAllDonelist = () => {
    const thisItems = this.state.items;
    console.log(this.state.items);
    console.log(this.state.items.done);
    thisItems.map((tdl) => {
      if (tdl.done === true) {
        call("/todo", "DELETE", tdl ).then((response) =>
        this.setState({ items: response.data })
        );
      }
    });
  }

  // 목록 비우기
  clearAll = () => {
    const thisItems = this.state.items;
    console.log(this.state.items);
    thisItems.map((tdl) => {    
      call("/todo", "DELETE", tdl ).then((response) =>
      this.setState({ items: response.data })
      );
    });
  }

  update = (item) => {
    call("/todo","PUT",item).then((response) =>
      this.setState({items:response.data})
    );
  }

  // componentDidmount는 페이지(돔) 마운트가 일어나고 렌더링되기 전에 실행된다.
  componentDidMount() {
    call("/todo","GET", null).then((response) =>
      this.setState({items:response.data, loading:false})
    );
  }

  render() {
    // todoItems에 this.state.items.length가 0보다 크다면 true이므로 && 뒤에 값을 넘겨준다.
    // todoItem = this.state.items.length > 0 ? (<Paper></Paper>):""; 이렇게 해도 같은 결과이다. 조건선택문 
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{margin:16}}>
        <List>
          {this.state.items.map((item,idx) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
          ))}
        </List>
        <div> 해야 할 일: {this.state.items.length} 개 </div>
      </Paper>
    );

    // navigationBar
    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justifyContent="space-between" container>
            <Grid item>
              <Typography variant="h6">Todo List</Typography>
            </Grid>
            <Grid item>
              <Clock/>
            </Grid>
            <Grid item>
              <Button color="inherit" onClick={signout}>logout</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )

    // var cleardone = () => {
    //   return (
    //     <div className="clearAlldonelist">
    //     </div>
    //   )
    // }
    

    // loading 중이 아닐 때
    var todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
        <DeleteDoneAll clearAllDonelist={this.clearAllDonelist} />
        <Clear clearAll={this.clearAll} />
      </div>
    );

    // loading 중일 때
    var loadingPage = <h1>Loading...</h1>
    var content =loadingPage;

    if(!this.state.loading) {
      content = todoListPage;
    }



    // 생성된 컴포넌트 JSX를 리턴한다.
    return (
      <div className="App">
        {content}
      </div>
    );
  }
}


export default App;
