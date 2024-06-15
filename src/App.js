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

  //todo list 추가 
  add = (item) => {
    item.date = this.state.selectedDate.toISOString().split('T')[0];
    call("/todo", "POST", item).then((response) => {
      this.setState({ items: response.data }, () => {
        this.fetchDateItems(this.state.selectedDate);
      });
    });
  };

  //todo list 삭제 
  delete = (item) => {
    call("/todo", "DELETE", item).then((response) => {
      this.setState({ items: response.data }, () => {
        this.fetchDateItems(this.state.selectedDate);
      });
    });
  };

  //완료된 리스트 삭제 
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

  //리스트 전체 삭제 
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

  //todo list 업데이트 
  update = (item) => {
    call("/todo", "PUT", item).then((response) => {
      this.setState({ items: response.data }, () => {
        this.fetchDateItems(this.state.selectedDate);
      });
    });
  };

  //사용자 정보 가져오기 
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

    //다크모드
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

// 캘린더에서 날짜가 변경될 때
  onDateChange = (date) => {
    this.setState({ selectedDate: date }, () => {
      this.fetchDateItems(date); // 선택된 날짜에 해당하는 데이터를 가져옵니다.
    });
  }

  //선택된 날짜에 해당하는 데이터 가져오기
  fetchDateItems = (date) => {
    // 입력받은 date를 ISO 형식의 문자열로 변환하고, 시간 부분을 제외
    const formattedDate = date.toISOString().split('T')[0];
     // API 엔드포인트를 호출하여 선택된 날짜에 해당하는 데이터를 가져오기
    call(`/todo/date/${formattedDate}`, "GET", null).then((response) => {
      this.setState({ dateItems: response.data });
    });
  }

//다크모드 선택과 해제
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
    const { darkMode, selectedDate, items, dateItems, loading } = this.state;

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
