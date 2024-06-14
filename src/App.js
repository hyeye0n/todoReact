import 'bulma/css/bulma.min.css';
import React, { Component } from 'react';
import Todo from './components/Todo';
import AddTodo from './components/AddTodo';
import { call } from './service/ApiService';
import DeleteDoneAll from './components/DeleteDoneAll';
import Clear from './components/Clear';
import './styles/App.css';
import WeatherWidget from './components/WeatherWidget';
import MyCalendar from './components/MyCalendar';
import NavigationBar from './components/NavigationBar';

class App extends Component {
  constructor(props) {
    super(props);
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    this.state = {
      items: [],
      dateItems: [],
      loading: true,
      selectedDate: new Date(),
      username: null,
      memo: null,
      darkMode: savedDarkMode !== null ? savedDarkMode : false
    };
  }

  add = (item) => {
    item.date = this.state.selectedDate.toISOString().split('T')[0];
    call("/todo", "POST", item).then((response) => {
      this.setState({ items: response.data }, () => {
        this.fetchDateItems(this.state.selectedDate);
      });
    });
  };

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) => {
      this.setState({ items: response.data }, () => {
        this.fetchDateItems(this.state.selectedDate);
      });
    });
  };

  clearAllDonelist = () => {
    const thisItems = this.state.items;
    thisItems.forEach((tdl) => {
      if (tdl.done === true) {
        call("/todo", "DELETE", tdl).then((response) => {
          this.setState({ items: response.data }, () => {
            this.fetchDateItems(this.state.selectedDate);
          });
        });
      }
    });
  };

  clearAll = () => {
    const thisItems = this.state.items;
    thisItems.forEach((tdl) => {
      call("/todo", "DELETE", tdl).then((response) => {
        this.setState({ items: response.data }, () => {
          this.fetchDateItems(this.state.selectedDate);
        });
      });
    });
  };

  update = (item) => {
    call("/todo", "PUT", item).then((response) => {
      this.setState({ items: response.data }, () => {
        this.fetchDateItems(this.state.selectedDate);
      });
    });
  };

  componentDidMount() {
    call("/auth/userinfo", "GET")
      .then(response => {
        this.setState({ username: response.username });
      })
      .catch(error => {
        console.error("Failed to fetch user info:", error);
      });

    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false }, () => {
        this.fetchDateItems(this.state.selectedDate);
      })
    );

    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  onDateChange = (date) => {
    this.setState({ selectedDate: date }, () => {
      this.fetchDateItems(date);
    });
  }

  fetchDateItems = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    call(`/todo/date/${formattedDate}`, "GET", null).then((response) => {
      this.setState({ dateItems: response.data });
    });
  }

  toggleDarkMode = () => {
    this.setState((prevState) => {
      const newDarkMode = !prevState.darkMode;
      if (newDarkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
      return { darkMode: newDarkMode };
    });
  }

  render() {
    const { darkMode, username, selectedDate, items, dateItems, loading } = this.state;

    var todoItems = dateItems.length > 0 && (
      <div className="box">
        <ul>
          {dateItems.map((item) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
          ))}
        </ul>
        <div className='todo1'> 해야 할 일: {dateItems.length} 개 </div>
      </div>
    );

    var todoListPage = (
      <div>
        <NavigationBar username={username} darkMode={darkMode} toggleDarkMode={this.toggleDarkMode} />
        <div className="container">
          <div className="section">
            <AddTodo add={this.add} selectedDate={selectedDate} />
            <div className="TodoList">{todoItems}</div>
          </div>
          <div className="buttons-container">
            <DeleteDoneAll clearAllDonelist={this.clearAllDonelist} />
            <Clear clearAll={this.clearAll} />
          </div>
        </div>
        <div className="calendar-weather-container">
          <div className="calendar-container">
            <MyCalendar onDateChange={this.onDateChange} items={items} />
          </div>
          <div className="weather-widget">
            <WeatherWidget darkMode={darkMode} />
          </div>
        </div>
      </div>
    );

    var loadingPage = <h1>Loading...</h1>;
    var content = loadingPage;

    if (!loading) {
      content = todoListPage;
    }

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;
