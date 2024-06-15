import React from 'react';

const WeatherWidget = ({ darkMode }) => {
  const widgetUrl = darkMode 
    ? 'https://indify.co/widgets/live/weather/SrM5eArKcXmj3Nvu2Ils' // 다크 모드 URL
    : 'https://indify.co/widgets/live/weather/l2rMFu7gE8eDgVsDlwvj'; // 라이트 모드 URL

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <iframe 
        key={widgetUrl} // key 속성을 사용하여 URL 변경 시 컴포넌트 재렌더링
        src={widgetUrl} 
        style={{ border: 'none', width: '100%', height: '100%' }}
        title="Weather Widget"
      ></iframe>
    </div>
  );
};

export default WeatherWidget;
