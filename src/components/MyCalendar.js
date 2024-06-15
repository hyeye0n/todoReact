import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css';

const MyCalendar = ({ onDateChange, items }) => {
  const [date, setDate] = useState(new Date());
  const calendarRef = useRef();

  useEffect(() => {
    // 컴포넌트가 마운트될 때 오늘 날짜를 한 번 클릭
    if (calendarRef.current) {
      const todayCell = calendarRef.current.querySelector('.react-calendar__tile--now');
      if (todayCell) {
        todayCell.click();
      }
    }
  }, []);

  // 날짜 선택이 변경될 때 호출
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    onDateChange(selectedDate); // 선택한 날짜를 상위 컴포넌트로 전달
  };

    // 달력 타일의 내용을 정의
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().substring(0, 10);
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
    <div ref={calendarRef}>
      <Calendar 
        onChange={handleDateChange} 
        value={date} 
        formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
        tileContent={tileContent}
      />
      <div>
        <h2>Todos for {date.toDateString()}</h2>
      </div>
    </div>
  );
};

export default MyCalendar;
