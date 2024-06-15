import React, { useState, useEffect } from 'react';

//시계 추가 

const Clock = () => {
    const [time, setTime] = useState(new Date());

    // setInterval을 사용하여 매 1초마다 setTime(new Date())를 호출하여 time 상태를 현재 시간으로 업데이트
    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);

        return () => clearInterval(timerId);
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행되도록 함

    return (
        <div>
        <h2>{time.toLocaleDateString()} {time.toLocaleTimeString()}</h2>
        </div>
    );
};

export default Clock;
