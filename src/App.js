import './App.css';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter><Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login-page" element={<LoginPage />} />
      </Routes></BrowserRouter>
    </div>
  );
}

export default App;
