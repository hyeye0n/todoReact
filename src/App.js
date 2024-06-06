import 'bulma/css/bulma.min.css';
import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { call, signout } from './service/ApiService';
import DeleteDoneAll from './DeleteDoneAll';
import Clear from './Clear';
import Clock from './Clock';
import './css/App.css';
import WeatherWidget from './WeatherWidget';
import MyCalendar from './MyCalendar'; // MyCalendar 컴포넌트 임포트
import {Link} from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      dateItems: [], // 선택한 날짜의 할 일들
      loading: true,
      selectedDate: new Date() // 선택한 날짜 상태 추가
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

  //전체 삭제 기능
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
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false }, () => {
        this.fetchDateItems(this.state.selectedDate); // 초기 로딩 시 선택한 날짜의 할 일 목록 가져오기
      })
    );
  }

  // 날짜 선택 핸들러 추가
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

  // 해야하는 리스트의 수 추가 
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
        {navigationBar}
        <div className="container">
          <div className="section">
            <AddTodo add={this.add} selectedDate={this.state.selectedDate} /> {/* selectedDate 전달 */}
            <div className="TodoList">{todoItems}</div>
          </div>
          <div className="buttons-container"> {/* 버튼 컨테이너 클래스 추가 */}
            <DeleteDoneAll clearAllDonelist={this.clearAllDonelist} />
            <Clear clearAll={this.clearAll} />
          </div>
        </div>
        <div className="calendar-weather-container">
          <div className="calendar-container">
            <MyCalendar 
              onDateChange={this.onDateChange} 
              items={this.state.items} // items 전달
            /> {/* 날짜 변경 핸들러 전달 */}
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
