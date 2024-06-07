import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { call } from '../service/ApiService';
import '../styles/Calendar.css';

const MyCalendar = ({ onDateChange, items }) => {
  const [date, setDate] = useState(new Date());
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos(date);
  }, [date]);

  const fetchTodos = async (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    try {
      const response = await call(`/todo/date/${formattedDate}`, 'GET');
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    onDateChange(selectedDate); // 선택한 날짜를 부모 컴포넌트로 전달
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      const dayItems = items.filter(item => item.date === dateString);
      if (dayItems.length > 0) {
        const allChecked = dayItems.every(item => item.done);
        const dotColor = allChecked ? 'green-dot' : 'red-dot';
        return <div className={dotColor}></div>;
      }
    }
    return null;
  };

  return (
    <div>
      <Calendar 
        onChange={handleDateChange} 
        value={date} 
        formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
        tileContent={tileContent} // tileContent prop 추가
      />
      <div>
        <h2>Todos for {date.toDateString()}</h2>
      </div>
    </div>
  );
};

export default MyCalendar;
