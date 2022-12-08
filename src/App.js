import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from './pages/welcome/welcome';
import Easy from './pages/easyai/easy';
import Hard from './pages/hardai/hard';
import Friend from './pages/friend/friend';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/easy" element={<Easy />} />
          <Route path="/hard" element={<Hard />} />
          <Route path="/friend" element={<Friend />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
