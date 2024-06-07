import 'bulma/css/bulma.min.css';
import React from 'react';
import Todo from './components/Todo';
import AddTodo from './components/AddTodo';
import { call, signout } from './service/ApiService';
import DeleteDoneAll from './components/DeleteDoneAll';
import Clear from './components/Clear';
import './styles/App.css';
import WeatherWidget from './components/WeatherWidget';
import MyCalendar from './components/MyCalendar';
import NavigationBar from './components/NavigationBar'; // NavigationBar 컴포넌트 임포트

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      dateItems: [], // 선택한 날짜의 할 일들
      loading: true,
      selectedDate: new Date(), // 선택한 날짜 상태 추가
      username: null //유저 이름
    };
  }

  add = (item) => {
    // 선택한 날짜를 item에 추가
    item.date = this.state.selectedDate.toISOString().split('T')[0];
    call("/todo", "POST", item).then((response) => {
      this.setState({ items: response.data }, () => {
        this.fetchDateItems(this.state.selectedDate); // 선택한 날짜의 할 일 목록 갱신
      });
    });
  };

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) => {
      this.setState({ items: response.data }, () => {
        this.fetchDateItems(this.state.selectedDate); // 선택한 날짜의 할 일 목록 갱신
      });
    });
  };

  clearAllDonelist = () => {
    const thisItems = this.state.items;
    thisItems.forEach((tdl) => {
      if (tdl.done === true) {
        call("/todo", "DELETE", tdl).then((response) => {
          this.setState({ items: response.data }, () => {
            this.fetchDateItems(this.state.selectedDate); // 선택한 날짜의 할 일 목록 갱신
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
          this.fetchDateItems(this.state.selectedDate); // 선택한 날짜의 할 일 목록 갱신
        });
      });
    });
  };

  update = (item) => {
    call("/todo", "PUT", item).then((response) => {
      this.setState({ items: response.data }, () => {
        this.fetchDateItems(this.state.selectedDate); // 선택한 날짜의 할 일 목록 갱신
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

    call("/auth/userinfo", "GET")
      .then(response => {
        this.setState({ username: response.username });
      })
      .catch(error => {
        console.error("Failed to fetch user info:", error);
      });

    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false }, () => {
        this.fetchDateItems(this.state.selectedDate); // 초기 로딩 시 선택한 날짜의 할 일 목록 가져오기
      })
    );
  }

  onDateChange = (date) => {
    this.setState({ selectedDate: date }, () => {
      this.fetchDateItems(date); // 선택한 날짜의 할 일 목록 가져오기
    });
  }

  fetchDateItems = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    call(`/todo/date/${formattedDate}`, "GET", null).then((response) => {
      this.setState({ dateItems: response.data });
    });
  }

  render() {
    var todoItems = this.state.dateItems.length > 0 && (
      <div className="box">
        <ul>
          {this.state.dateItems.map((item) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
          ))}
        </ul>
        <div> 해야 할 일: {this.state.dateItems.length} 개 </div>
      </div>
    );

    

    var navigationBar = (
      <nav className="navbar navbar-todo" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <h1 className="title">Todo List</h1>
          </div>
          <div className="navbar-item"> <Clock /></div>
          <div className="navbar-item"> 안녕하세요, {this.state.username || "사용자"}님!</div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
            <Link to="/auth/userinfo" className="button is-info" >🔒회원정보</Link>
              <button className="button is-info" onClick={signout}> ⭐Logout </button>
            </div>
          </div>
        </div>
      </nav>
    );

    var todoListPage = (
      <div>
        <NavigationBar username={this.state.username} /> {/* NavigationBar 컴포넌트 사용 */}
        <div className="container">
          <div className="section">
            <AddTodo add={this.add} selectedDate={this.state.selectedDate} /> {/* selectedDate 전달 */}
            <div className="TodoList">{todoItems}</div>
          </div>
          <div className="buttons-container">
            <DeleteDoneAll clearAllDonelist={this.clearAllDonelist} />
            <Clear clearAll={this.clearAll} />
          </div>
        </div>
        <div className="calendar-weather-container">
          <div className="calendar-container">
            <MyCalendar 
              onDateChange={this.onDateChange} 
              items={this.state.items} // items 전달
            />
          </div>
          <div className="weather-widget">
            <WeatherWidget />
          </div>
        </div>
      </div>
    );

    var loadingPage = <h1>Loading...</h1>;
    var content = loadingPage;

    if (!this.state.loading) {
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
