import 'bulma/css/bulma.min.css'
import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo'
import { call, signout } from './service/ApiService';
import DeleteDoneAll from './DeleteDoneAll';
import Clear from './Clear';
import Clock from './Clock';
import './css/App.css';
import { blue } from '@material-ui/core/colors';
import WeatherWidget from './WeatherWidget';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
    };
  }

  add = (item) => {
    call("/todo", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
  }

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );
  }

  clearAllDonelist = () => {
    const thisItems = this.state.items;
    thisItems.forEach((tdl) => {
      if (tdl.done === true) {
        call("/todo", "DELETE", tdl).then((response) =>
          this.setState({ items: response.data })
        );
      }
    });
  }

  clearAll = () => {
    const thisItems = this.state.items;
    thisItems.forEach((tdl) => {
      call("/todo", "DELETE", tdl).then((response) =>
        this.setState({ items: response.data })
      );
    });
  }

  update = (item) => {
    call("/todo", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );
  }

  componentDidMount() {
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false })
    );
    
  }

  render() {
    var todoItems = this.state.items.length > 0 && (
      <div className="box">
        <ul>
          {this.state.items.map((item) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
          ))}
        </ul>
        <div> 해야 할 일: {this.state.items.length} 개 </div>
      </div>
    );

    var navigationBar = (
      <nav className="navbar navbar-todo"  role="navigation" aria-label="main navigation">
        <div className="navbar-brand  ">
          <div className="navbar-item ">
            <h1 className="title ">Todo List</h1>
          </div>
          <div className="navbar-item ">
            <Clock/>
          </div>
          
        </div>
        <div className="navbar-end">
          <div className="navbar-item ">
            <div className="buttons">
              <button className="button is-info" onClick={signout}>
                ⭐Logout
                </button>
            </div>
          </div>
        </div>
      </nav>
    );

    var todoListPage = (
      <div>
        {navigationBar}
        <div className="container">
          <div className="section">
            <AddTodo add={this.add} />
            <div className="TodoList">{todoItems}</div>
          </div>
          <div className="buttons">
            <DeleteDoneAll clearAllDonelist={this.clearAllDonelist} />
            <Clear clearAll={this.clearAll} />
          </div>
        </div>
       
       
        
      </div>
    );

    var loadingPage = <h1>Loading...</h1>
    var content = loadingPage;

    if (!this.state.loading) {
      content = todoListPage;
    }

    return (
      <div className="App">
        {content}
        <WeatherWidget/>
      </div>
    );
  }
}

export default App;
