import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
        formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })
        }
      />
    </div>
  );

};

export default MyCalendar;