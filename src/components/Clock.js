import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);

        return () => clearInterval(timerId);
    }, []);

    return (
        <div>
        <h2>{time.toLocaleDateString()} {time.toLocaleTimeString()}</h2>
        </div>
    );
};

export default Clock;
