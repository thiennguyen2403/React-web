import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const data = {
  name: 'nguyen van thien',
  age: 18,
  email: 'thiennvph31142@fpt.edu.vn',
  address: 'Ninh Bình',
};

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? '#333' : '#fff';
    document.body.style.color = isDark ? '#fff' : '#000';
  }, [isDark]);

  const handleSetTheme = () => {
    setIsDark(prevIsDark => !   prevIsDark);
  };

  return (
    <>
      <button onClick={handleSetTheme}>Set Theme</button>
      <h1>Thông Tin Cá Nhân</h1>
      <p>{data.name}</p>
      <p>{data.age}</p>
      <p>{data.email}</p>
      <p>{data.address}</p>
    </>
  );
}

export default App;
