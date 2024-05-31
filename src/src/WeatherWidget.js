import React, { useEffect } from 'react';

const WeatherWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static1.sharpweather.com/widgetjs/?id=id9a89a81a7f0e9';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="id9a89a81a7f0e9" a='{"t":"r","v":"1.2","lang":"ko","locs":[3908],"ssot":"c","sics":"ds","cbkg":"#FFFFFF","cfnt":"#000000","codd":"#FFFFFF","cont":"#000000d4"}'>
      날씨 데이터 소스: <a href="https://sharpweather.com/weather_bucheon/30_days/">sharpweather.com/weather_bucheon/30_days/</a>
    </div>
  );
};

export default WeatherWidget;
